import './style.css';
import { displayInputWindow, displayNewTask, clearForm, displayTask, displayEditTask, wipeDiv } from './dom';

console.log('Yeet')

displayTask()

const taskArray = []

export class task {
    static counter = 0;
    constructor(title, description, dueDate, priority, notes) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
    }  
}

//use event delegation so you don't have so many event listeners. May also fix issue with listeners not working after one is used


const div = document.querySelector('#task-list')
console.log(div)
div.addEventListener('click', (e) => {
    if (e.target.classList.contains('task-div')) {
        const target = e.target.closest('.taskDiv')
        console.log(target)
        if (target) {
            let id = e.target.parentElement.id
            id = id.slice(7)
            id = parseInt(id)
            displayInputWindow(true, 'editWindow')
            editItem('tasklist', id)
            submitEditedTask(id)
        }
    }
    if (e.target.className === 'deleteBtn') {
        const target = e.target.closest('.task-div')
        if (target) {
            let id = target.id
            id = id.slice(3)
            id = parseInt(id)
            deleteItem('tasklist', id)
            wipeDiv('task-list')
            displayTask()
        }
    }
    else return console.log('fuck you')
})

    const taskBtn = document.getElementById('task-btn');
    taskBtn.addEventListener('click', () => {
        displayInputWindow(true, 'inputWindow');
    })



    const submitBtn = document.getElementById('submit-btn');
    submitBtn.addEventListener('click', (e) => {
        const newTask = createTask();
        storeItem('tasklist', newTask, taskArray);
        wipeDiv('task-list')
        displayTask()
        displayInputWindow(false, 'inputWindow');
        clearForm('task-form')
        e.preventDefault();
    })



    const closeBtn = document.getElementById('close-btn');
    closeBtn.addEventListener('click', (e) => {
        displayInputWindow(false, 'inputWindow')
        clearForm('task-form')
        e.preventDefault()
    })



    const editCloseBtn = document.getElementById('close-btn-edit')
    editCloseBtn.addEventListener('click', (e) => {
        displayInputWindow(false, 'editWindow')
        clearForm('editTask-form')
        e.preventDefault()
    })



    // const deleteBtn = document.querySelectorAll('.delete-btn')
    // deleteBtn.forEach(button => {
    //     button.addEventListener('click', (e) => {
    //        const target = e.target.closest('.task-div')
    //        if (target) {
    //         let id = target.id
    //         id = id.slice(3)
    //         id = parseInt(id)
    //         deleteItem('tasklist', id)
    //         wipeDiv('task-list')
    //         displayTask()
    //        }
    //     })
    // })



    // const editDiv = document.querySelectorAll('.taskDiv')
    // editDiv.forEach(div => {
    //     div.addEventListener('click', (e) => {
    //         const target = e.target.closest('.taskDiv')
    //         if (target) {
    //             let id = e.target.parentElement.id
    //             id = id.slice(7)
    //             id = parseInt(id)
    //             displayInputWindow(true, 'editWindow')
    //             editItem('tasklist', id)
    //             submitEditedTask(id)
    //         }
    //     })
        
    // })


function submitEditedTask(id) {
    const submitEditBtn = document.getElementById('submit-btn-edit')
    submitEditBtn.addEventListener('click', (e) => {
        storeEditItem('tasklist', id)
        displayInputWindow(false, 'editWindow')
        clearForm('editTask-form')
        wipeDiv('task-list')
        displayTask()
        e.preventDefault()
    })
}

export function createElement(id, element, value, cssClass, ownId) {
    const content = document.getElementById(id)
    const container = document.createElement(element)
    container.innerHTML = value
    content.appendChild(container)
    container.setAttribute('class', cssClass)
    container.setAttribute('id', ownId)
    return container
}

function createTask() {
    const newTask = new task(document.getElementById('title').value, 
    document.getElementById('description').value, 
    document.getElementById('datePicker').value, 
    document.getElementById('priority').value, 
    '')
    taskArray.push(newTask)
    return newTask
}

function editTask() {
    const newTask = new task(document.getElementById('title-edit').value, 
    document.getElementById('description-edit').value, 
    document.getElementById('datePicker-edit').value, 
    document.getElementById('priority-edit').value, 
    document.getElementById('datePicker-edit').value, 
    document.getElementById('notes-edit').value)
    return newTask
}

function storeItem(key, value, arr) {
    const taskArray = fetchItem(key)
    if (taskArray == null) {
        localStorage.setItem(key, JSON.stringify(arr));
        return
    }
    taskArray.push(value)
    localStorage.setItem(key, JSON.stringify(taskArray));
}

function deleteItem(key, index) {
    let taskArray = fetchItem(key)
    taskArray.splice(index, 1)
    console.log(taskArray)
    localStorage.setItem(key, JSON.stringify(taskArray));
}

export function fetchItem(key) {
    return JSON.parse(localStorage.getItem(key));
}

function editItem(key, index) {
    const taskObj = fetchItem(key)
    let obj = taskObj.splice(index, 1, undefined)
    displayEditTask(obj[0])
}

function storeEditItem(key, index) {
    let taskObj = fetchItem(key)
    const newObj = editTask()
    taskObj.splice(index, 1, newObj)
    localStorage.setItem(key, JSON.stringify(taskObj))
}

// editItem is returning taskObj as an array, however taskObj[0] is always undefined
