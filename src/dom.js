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
            if (Object.keys(e).slice(-1)[0] !== key) {

            
            if (!exec) {
            createElement('task-list', 'div', '', 'task-div', 'div' + i)
            exec = true
            }
            createElement('div' + i, 'p', charRemove(JSON.stringify(e[key])), 'task-p')
            }
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

export function clearForm() {
    const form = document.getElementById('task-form')
    for (i = 0; i < form.elements.length; i++) {
        let element = form.elements[i]
        element.value = ''
    }
}

