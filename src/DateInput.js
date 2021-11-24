import { useState, useEffect, useRef } from 'react';

const initTimestamp = (new Date()).getTime();

const inputStyle = {
    fontSize: '20px',
    padding: '5px',
}

// возвращает название месяца по его номеру: 0 — январь, 1 — февраль, …
const getMonth = (number) => {
    const month = [
        'января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 
        'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
    ]
    return month[number];
}

// получает timestamp и возвращает строку вида «23 ноября 2021 09:36»
const getValue = (timestamp) => {
    const current = new Date(timestamp);

    let day = current.getDate().toString();
    const month = current.getMonth();
    const year = current.getFullYear().toString();
    let hours = current.getHours().toString();
    let minutes = current.getMinutes().toString();

    if (day.length === 1) day = '0' + day;
    if (hours.length === 1) hours = '0' + hours;
    if (minutes.length === 1) minutes = '0' + minutes;

    return day + ' ' + getMonth(month) + ' ' + year + ' ' + hours + ':' + minutes;
}

// позиции начала и конца для частей даты: день, месяц, год, часы и минуты
const getStartEnd = (input, timestamp) => {
    const value = getValue(timestamp);
    const [day, month, year, time] = value.split(' ');
    const [hours, minutes] = time.split(':');

    const positions = {}; // позиции начала и конца для частей даты
    positions.day = {start: 0, end: day.length};
    positions.month = {start: positions.day.end + 1, end: positions.day.end + 1 + month.length};
    positions.year = {start: positions.month.end + 1, end: positions.month.end + 1 + year.length};
    positions.hours = {start: positions.year.end + 1, end: positions.year.end + 1 + hours.length};
    positions.minutes = {start: positions.hours.end + 1, end: positions.hours.end + 1 + minutes.length};

    return positions;
}

// к timestamp прибавляет-вычитает день, месяц, год, час, минуту и возвращает новый timestamp
const changeDate = (timestamp, datePart, value = 1) => {
    const date = new Date(timestamp);
    switch (datePart) {
        case 'day': date.setDate(date.getDate() + value); break;
        case 'month': date.setMonth(date.getMonth() + value); break;
        case 'year': date.setFullYear(date.getFullYear() + value); break;
        case 'hours': date.setHours(date.getHours() + value); break;
        case 'minutes': date.setMinutes(date.getMinutes() + value); break;
    }
    return date.getTime();
}

// возвращает название той части даты (день, месяц,год,часы,минуты), куда был клик
const getClickedDatePart = (input, timestamp) => {
    input.selectionEnd = input.selectionStart;
    // где начинается-заканчивается каждая часть даты
    const positions = getStartEnd(input, timestamp)
    // смотрим, над какой частью даты сейчас каретка
    const caret = input.selectionStart;
    if (caret >= positions.day.start && caret <= positions.day.end) return 'day';
    if (caret >= positions.month.start && caret <= positions.month.end) return 'month';
    if (caret >= positions.year.start && caret <= positions.year.end) return 'year';
    if (caret >= positions.hours.start && caret <= positions.hours.end) return 'hours';
    if (caret >= positions.minutes.start && caret <= positions.minutes.end) return 'minutes';
    return null;
}

// устанавливает выделение внутри input-поля на ту часть даты, которая в datePart
const setPartSelection = (input, timestamp, datePart) => {
    // где начинается-заканчивается каждая часть даты
    const positions = getStartEnd(input, timestamp);

    switch (datePart) { // какую чаcть даты нужно выделить
        case 'day':
            input.setSelectionRange(positions.day.start, positions.day.end); return;
        case 'month':
            input.setSelectionRange(positions.month.start, positions.month.end); return;
        case 'year':
            input.setSelectionRange(positions.year.start, positions.year.end); return;
        case 'hours':
            input.setSelectionRange(positions.hours.start, positions.hours.end); return;
        case 'minutes':
            input.setSelectionRange(positions.minutes.start, positions.minutes.end); return;
    }
}

/*
 * Компонент для ввода даты — вводить что-то в input-поле нельзя, можно только кликнуть
 * в часть даты (день, месяц,год,часы,минуты) и дальше увеличивать-уменьшать стрелками
 */
const DateInput = () => {
    const inputElem = useRef(null);
    const datePart = useRef(null); // выделенная чать даты (day,month,year,hours,minutes)
    const [timestamp, setTimestamp] = useState(initTimestamp);

    useEffect(() => {
        // после каждого ренедера выделяем ту чаcть даты, которая в datePart (если не null)
        setPartSelection(inputElem.current, timestamp, datePart.current);
    });

    const handleClick = () => {
        const clicked = getClickedDatePart(inputElem.current, timestamp);
        if (clicked) { // если клик был на части даты, которую можно изменять
            setPartSelection(inputElem.current, timestamp, clicked); // выделить эту часть
        }
        datePart.current = clicked;
    }

    const handleArrowUpDown = (key) => {
        if (datePart.current) {
            const newTimestamp = key === 'ArrowUp'
                ? 
                changeDate(timestamp, datePart.current, 1)
                :
                changeDate(timestamp, datePart.current, -1);
            setTimestamp(newTimestamp);
        }
    }

    const handleArrowLeftRight = (key) => {
        // если выделена часть даты — смещаем выделение влево-вправо
        if (datePart.current) {
            switch (datePart.current) {
                case 'day': datePart.current = key === 'ArrowRight' ? 'month' : 'minutes'; break;
                case 'month': datePart.current = key === 'ArrowRight' ? 'year' : 'day'; break;
                case 'year': datePart.current = key === 'ArrowRight' ? 'hours' : 'month'; break;
                case 'hours': datePart.current = key === 'ArrowRight' ? 'minutes' : 'year'; break;
                case 'minutes': datePart.current = key === 'ArrowRight' ? 'day' : 'hours'; break;
            }
            setPartSelection(inputElem.current, timestamp, datePart.current)
        }
    }

    const handleArrow = (event) => {
        if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
            event.preventDefault();
            handleArrowUpDown(event.key);
        }
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault();
            handleArrowLeftRight(event.key);
        }
    }

    const inputValue = getValue(timestamp); // строка, которая вставляется в поле input

    return (
        <p>
            <input
                type="text"
                ref={inputElem}
                onClick={handleClick}
                onBlur={() => datePart.current = null}
                onKeyDown={event => handleArrow(event)}
                value={inputValue}
                style={inputStyle}
            />
        </p>
    )
}

export default DateInput;