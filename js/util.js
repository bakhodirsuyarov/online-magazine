const getElem = (param, child = document) => child.querySelector(param, child);
const creatElem = (param) => document.createElement(param);

function normalizeDate(time){
    const date = new Date(time);
    const month = date.getMonth() +1;
    const day = date.getDate();
    const year = date.getFullYear();

    return day + '.' + month + '.' + year
}