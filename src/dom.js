import { fetchItem } from "./storage";

function createElement(id, element, value, cssClass, ownId, dataKey) {
    const content = document.getElementById(id)
    const container = document.createElement(element)
    container.innerHTML = value
    content.appendChild(container)
    container.setAttribute('class', cssClass)
    container.setAttribute('id', ownId)
    container.dataset.key = dataKey
    return container
}

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

export function displayTask(key) {
    const dataKey = key
    const item = fetchItem(key);
    if (item == null) {
        return
    }
    let i = 0;
    let exec = false;
    item.forEach(e => {
        for (let key in e) {
            if (Object.keys(e).slice(-1)[0] !== key) {
                
            if (!exec) {
                // console.log(dataKey)
            createElement('task-list', 'div', '', 'task-div', 'div' + i, dataKey)
            createElement('div' + i, 'div', '', 'taskDiv', 'taskDiv' + i, dataKey)
            createElement('div' + i, 'div', '', 'button-div', 'btnDiv' + i, dataKey)
            createElement('btnDiv' + i, 'button', 'delete', 'delete-btn', '', dataKey)
            exec = true
            }
            createElement('taskDiv' + i, 'p', charRemove(JSON.stringify(e[key])), 'task-p', '', dataKey)
            }
        }
        ++i; 
        exec = false;
    });
};



export function displayProject() {
    const item = fetchItem('projectList')
    console.log
    if (item == null) {
        return
    }
    let i = 1
    item.forEach(e => {
        for (let key in e) {                      
            createElement('project-list', 'button', charRemove(JSON.stringify(e[key])), 'project-btn', 'project' + i, 'projects')   
            addOption(charRemove(JSON.stringify(e[key])), 'projects')
        }
        ++i; 
    });
}

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
    document.getElementById('projects-edit').value = obj.project
    document.getElementById('notes-edit').value = obj.notes
}



function addOption(value, id) {
  const selectElement = document.getElementById(id)
  const newOption = document.createElement('option')
  newOption.value = value
  newOption.text = value
  selectElement.add(newOption) // Or selectElement.appendChild(newOption);
}

// addOption