import { createElement, task, fetchItem } from ".";

export function displayInputWindow(i) {
    if (!i) {
        document.getElementById('inputWindow').style.visibility = "hidden";
    }
    if (i) {
        document.getElementById('inputWindow').style.visibility = "visible";
    }
}

(function displayStoredTask() {
    const item = fetchItem('tasklist');
    let i = 0;
    let exec = false;
    item.forEach(e => {
        for (let key in e) {
            if (!exec) {
            createElement('task-list', 'div', '', 'task-div', 'div' + i)
            exec = true
            }
            createElement('div' + i, 'p', charRemove(JSON.stringify(e[key])), 'task-p')
        }
        ++i; 
        exec = false;
    });
})();

let i = 0;

export function displayNewTask(taskObj) {
    createElement('task-list', 'div', '', 'task-div', 'newDiv' + i)
    for (let key in taskObj) {
        createElement('newDiv' + i, 'p', taskObj[key], 'task-p')
    }
    ++i;
};

function charRemove(str) {
    str =  str.replaceAll('"', '');
    return str;
}

// displayTask();

// function ()