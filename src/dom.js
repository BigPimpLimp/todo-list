import { fetchItem } from "./storage";
import deleteBtn from './svg/delete_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg';

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

export function wipeProjectOptions(divId) { 
    const projects = document.getElementById(divId)
    const children = [...projects.children].slice(2)
    children.forEach(e => {
       e.remove()
    })
}

export function displayTask(key) {
    const dataKey = key
    const item = fetchItem(key);
    displayProjectHeader(key)
    if (item == null) {
        return
    }
    let i = 0;
    let exec = false;
    item.forEach(e => {
        for (let key in e) {
            if (Object.keys(e).slice(-1)[0] !== key) {
                
            if (!exec) {
            createElement('task-list', 'div', '', 'task-div', 'div' + i, dataKey)
            createElement('div' + i, 'div', '', 'taskDiv', 'taskDiv' + i, dataKey)
            createElement('div' + i, 'div', '', 'button-div', 'btnDiv' + i, dataKey)
            createElement('btnDiv' + i, 'button', '', 'delete-btn', '', dataKey)

            exec = true
            }
            if (key == 'title' || key == 'dueDate') {
            createElement('taskDiv' + i, 'p', charRemove(JSON.stringify(e[key])), 'task-p', '', dataKey)
            }
          }  
        }
        ++i; 
        exec = false;
    });
    createSvg('.delete-btn', 'delete-btn')
};




export function displayProject() {
    const item = fetchItem('projectList')
    const dataKey = 'projectList'
    if (item == null) {
        return
    }
    let i = 1 //may need to change back to 1
    item.forEach(e => {
        for (let key in e) {                      
            createElement('project-list', 'div', '', 'project-div', 'project' + i, 'projects')
            createElement('project' + i, 'button', charRemove(JSON.stringify(e[key])), 'project-btn', 'project-btn' + i, 'projects') 
            createElement('project' + i, 'button', '', 'delete-project-btn', 'project-delete-btn' + i, 'projectList')  
            addOption(charRemove(JSON.stringify(e[key])), 'projects')
        }
        ++i; 
    });
    createSvg('.delete-project-btn', 'delete-project-btn')
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


function createSvg(a, b) { // a is css class with . b is without .
    const btn = document.querySelectorAll(a)
    btn.forEach(e => {
        const img = document.createElement('img')
        img.setAttribute('src', deleteBtn)
        img.setAttribute('class', b)
        e.appendChild(img)
    })

}

function displayProjectHeader(key) {
    console.log(key)
    const div = document.getElementById('task-header')
    div.innerHTML = key
}