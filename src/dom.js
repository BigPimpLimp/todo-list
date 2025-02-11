import { createElement, task, fetchItem } from ".";

export function displayInputWindow(bool, id) {
    if (!bool) {
        document.getElementById(id).style.visibility = "hidden";
    }
    if (bool) {
        document.getElementById(id).style.visibility = "visible";
    }
}

export function wipeDiv(divId) {
    const div = document.getElementById(divId)
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
}

export function displayTask() {
    const item = fetchItem('tasklist');
    if (item == null) {
        return
    }
    let i = 0;
    let exec = false;
    console.log(item)
    item.forEach(e => {
        for (let key in e) {
            if (Object.keys(e).slice(-1)[0] !== key) {
                
            if (!exec) {
            createElement('task-list', 'div', '', 'task-div', 'div' + i)
            createElement('div' + i, 'button', 'delete', 'delete-btn', '')
            exec = true
            }
            createElement('div' + i, 'p', charRemove(JSON.stringify(e[key])), 'task-p')
            }
        }
        ++i; 
        exec = false;
    });
};

function charRemove(str) {
    str =  str.replaceAll('"', '');
    return str;
}

export function clearForm(id) {
    let i = 0
    const form = document.getElementById(id)
    for (i = 0; i < form.elements.length; i++) {
        let element = form.elements[i]
        element.value = ''
    }
}

export function displayEditTask(obj) {
    document.getElementById('title-edit').value = obj.title
    document.getElementById('description-edit').value = obj.description
    document.getElementById('datePicker-edit').value = obj.dueDate
    document.getElementById('priority-edit').value = obj.priority
    document.getElementById('notes-edit').value = obj.notes
}

displayTask();