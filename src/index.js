import './style.css';
import { displayInputWindow, displayNewTask, clearForm, displayTask, displayEditTask, wipeDiv, displayProject } from './dom';

console.log('Yeet')

displayTask('Home')
displayProject()

const taskArray = []
const projectArray = []

class task {
    static counter = 0;
    constructor(title, description, dueDate, priority, project, notes) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.project = project;
        this.notes = notes;
    }  

    get myProject() {
        return this.project
    }
}

class project {
    constructor(title) {
        this.title = title
    }
}

//need function that will get task.project when selecting a task to edit

let id = null

const div = document.querySelector('#task-list')
div.addEventListener('click', (e) => {
    if (e.target.matches('.task-p')) {
        const target = e.target.closest('.taskDiv')
        if (target) {
            id = e.target.parentElement.id
            id = id.slice(7)
            id = parseInt(id)
            console.log(id)
            const dataKey = target.getAttribute('data-key')
            displayInputWindow(true, 'editWindow')
            editItem(dataKey, id)
        }
    }
    if (e.target.matches('.delete-btn')) {
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
})

const navButtons = document.querySelector('#nav-buttons')
navButtons.addEventListener('click', (e) => {
    if (e.target.matches('#task-btn')) {
        displayInputWindow(true, 'inputWindow');
    }
    if (e.target.matches('#add-project')) {
        displayInputWindow(true, 'project-form-div')
    }
    if (e.target.matches('.project-btn')) {
        const target = e.target.closest('.project-btn')
        console.log(target)
        if (target) {
            console.log(target.innerHTML)
            wipeDiv('task-list')
            displayTask(target.innerHTML)
        }
    }
})

const projectForm = document.querySelector('#project-form-div')
projectForm.addEventListener('click', (e) => {
    if (e.target.matches('#close-btn-project')) {
        displayInputWindow(false, 'project-form-div')
        clearForm('project-form')
        e.preventDefault()
    }
    if (e.target.matches('#submit-btn-project')) {
        const newProject = createProject()
        storeItem('projectList', newProject)
        wipeDiv('project-list')
        displayProject()
        displayInputWindow(false, 'project-form-div')
        clearForm('project-form')
        e.preventDefault()
    }
})

const taskForm = document.querySelector('#inputWindow')
taskForm.addEventListener('click' , (e) => {
    if (e.target.matches('#submit-btn')) {
        const newTask = createTask();
        storeItem(newTask.myProject, newTask);
        console.log(newTask.myProject)
        wipeDiv('task-list')
        displayTask(newTask.myProject)
        displayInputWindow(false, 'inputWindow');
        clearForm('task-form')
        e.preventDefault();
    }
    if (e.target.matches('#close-btn')) {
        displayInputWindow(false, 'inputWindow')
        clearForm('task-form')
        e.preventDefault()
    }
})

const editTaskWindow = document.querySelector('#editWindow')
editTaskWindow.addEventListener('click', (e) => {
    if (e.target.matches('#submit-btn-edit')) {

        storeEditItem('tasklist', id) //adjust func to get data-key value from dom
        displayInputWindow(false, 'editWindow')
        clearForm('editTask-form')
        wipeDiv('task-list')
        displayTask('tasklist')
        e.preventDefault()
    }
    if (e.target.matches('#close-btn-edit')) {
        displayInputWindow(false, 'editWindow')
        clearForm('editTask-form')
        e.preventDefault()
    }
})

function createTask() {
    const newTask = new task(document.getElementById('title').value, 
    document.getElementById('description').value, 
    document.getElementById('datePicker').value, 
    document.getElementById('priority').value, 
    document.getElementById('projects').value,
    '')
    return newTask
}

function createProject() {
    const newProject = new project(document.getElementById('name').value)
    projectArray.push(newProject)
    return newProject
}

function editTask() {
    const newTask = new task(document.getElementById('title-edit').value, 
        document.getElementById('description-edit').value, 
        document.getElementById('datePicker-edit').value, 
        document.getElementById('priority-edit').value, 
        document.getElementById('projects').value,
        document.getElementById('notes-edit').value)
        return newTask
}

function storeItem(key, value) {
    const taskArray = fetchItem(key)
    if (taskArray == null) {
        localStorage.setItem(key, JSON.stringify(value));
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
