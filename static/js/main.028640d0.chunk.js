(this["webpackJsonpdate-input"]=this["webpackJsonpdate-input"]||[]).push([[0],{10:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),s=n(4),u=n.n(s),o=n(2),c=n(1),i=(new Date).getTime(),d={fontSize:"20px",padding:"5px"},h=function(e){var t=new Date(e),n=t.getDate().toString(),r=t.getMonth(),a=t.getFullYear().toString(),s=t.getHours().toString(),u=t.getMinutes().toString();return 1===n.length&&(n="0"+n),1===s.length&&(s="0"+s),1===u.length&&(u="0"+u),n+" "+(["\u044f\u043d\u0432\u0430\u0440\u044f","\u0444\u0435\u0432\u0440\u0430\u043b\u044f","\u043c\u0430\u0440\u0442\u0430","\u0430\u043f\u0440\u0435\u043b\u044f","\u043c\u0430\u044f","\u0438\u044e\u043d\u044f","\u0438\u044e\u043b\u044f","\u0430\u0432\u0433\u0443\u0441\u0442\u0430","\u0441\u0435\u043d\u0442\u044f\u0431\u0440\u044f","\u043e\u043a\u0442\u044f\u0431\u0440\u044f","\u043d\u043e\u044f\u0431\u0440\u044f","\u0434\u0435\u043a\u0430\u0431\u0440\u044f"][r]+" ")+a+" "+s+":"+u},l=function(e,t){var n=h(t).split(" "),r=Object(o.a)(n,4),a=r[0],s=r[1],u=r[2],c=r[3].split(":"),i=Object(o.a)(c,2),d=i[0],l=i[1],g={};return g.day={start:0,end:a.length},g.month={start:g.day.end+1,end:g.day.end+1+s.length},g.year={start:g.month.end+1,end:g.month.end+1+u.length},g.hours={start:g.year.end+1,end:g.year.end+1+d.length},g.minutes={start:g.hours.end+1,end:g.hours.end+1+l.length},g},g=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1,r=new Date(e);switch(t){case"day":r.setDate(r.getDate()+n);break;case"month":r.setMonth(r.getMonth()+n);break;case"year":r.setFullYear(r.getFullYear()+n);break;case"hours":r.setHours(r.getHours()+n);break;case"minutes":r.setMinutes(r.getMinutes()+n)}return r.getTime()},y=function(e,t,n){var r=l(0,t);switch(n){case"day":return void e.setSelectionRange(r.day.start,r.day.end);case"month":return void e.setSelectionRange(r.month.start,r.month.end);case"year":return void e.setSelectionRange(r.year.start,r.year.end);case"hours":return void e.setSelectionRange(r.hours.start,r.hours.end);case"minutes":return void e.setSelectionRange(r.minutes.start,r.minutes.end)}},m=function(){var e=Object(r.useRef)(null),t=Object(r.useRef)(null),n=Object(r.useState)(i),a=Object(o.a)(n,2),s=a[0],u=a[1];Object(r.useEffect)((function(){y(e.current,s,t.current)}));var m=function(n){"ArrowUp"!==n.key&&"ArrowDown"!==n.key||(n.preventDefault(),function(e){if(t.current){var n=g(s,t.current,"ArrowUp"===e?1:-1);u(n)}}(n.key)),"ArrowLeft"!==n.key&&"ArrowRight"!==n.key||(n.preventDefault(),function(n){if(t.current){switch(t.current){case"day":t.current="ArrowRight"===n?"month":"minutes";break;case"month":t.current="ArrowRight"===n?"year":"day";break;case"year":t.current="ArrowRight"===n?"hours":"month";break;case"hours":t.current="ArrowRight"===n?"minutes":"year";break;case"minutes":t.current="ArrowRight"===n?"day":"hours"}y(e.current,s,t.current)}}(n.key))},f=h(s);return Object(c.jsx)("p",{children:Object(c.jsx)("input",{type:"text",ref:e,onClick:function(){var n=function(e,t){e.selectionEnd=e.selectionStart;var n=l(0,t),r=e.selectionStart;return r>=n.day.start&&r<=n.day.end?"day":r>=n.month.start&&r<=n.month.end?"month":r>=n.year.start&&r<=n.year.end?"year":r>=n.hours.start&&r<=n.hours.end?"hours":r>=n.minutes.start&&r<=n.minutes.end?"minutes":null}(e.current,s);n&&y(e.current,s,n),t.current=n},onBlur:function(){return t.current=null},onKeyDown:function(e){return m(e)},value:f,style:d})})};u.a.render(Object(c.jsx)(a.a.StrictMode,{children:Object(c.jsx)(m,{})}),document.getElementById("root"))}},[[10,1,2]]]);
//# sourceMappingURL=main.028640d0.chunk.js.map