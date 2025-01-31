import { createElement } from ".";

export function displayInputWindow(i) {
    if (!i) {
        document.getElementById('inputWindow').style.visibility = "hidden";
    }
    if (i) {
        document.getElementById('inputWindow').style.visibility = "visible";
    }
}

export function fetchItem(key) {
   return JSON.parse(localStorage.getItem(key));
    // console.log(item);
    // return item;
}

export function displayTask() {
    const item = fetchItem('tasklist');
    console.log(item);
    let i = 0;
    item.forEach(e => {
        for (let key in e) {
            createElement('task-list', 'div', '', 'task-div', 'div' + i)
            createElement('div' + i, 'p', charRemove(JSON.stringify(e[key])), 'task-p')
        }
        i++; 
    });
};

function charRemove(str) {
    str = str.replaceAll('"', '');
    return str;
}

// displayTask();

// function ()