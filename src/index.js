import './style.css';
import { displayInputWindow, displayNewTask, clearForm, displayTask, displayEditTask, wipeDiv, displayProject, wipeProjectOptions } from './dom';
import { storeItem, deleteItem, fetchItem, editItem, storeEditItem } from './storage';

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

export function createTask() {
    const newTask = new task(document.getElementById('title').value, 
    document.getElementById('description').value, 
    document.getElementById('datePicker').value, 
    document.getElementById('priority').value, 
    document.getElementById('projects').value,
    '')
    return newTask
}

export function editTask() {
    const newTask = new task(document.getElementById('title-edit').value, 
        document.getElementById('description-edit').value, 
        document.getElementById('datePicker-edit').value, 
        document.getElementById('priority-edit').value, 
        document.getElementById('projects').value,
        document.getElementById('notes-edit').value)
        return newTask
}

export function createProject() {
    const newProject = new project(document.getElementById('name').value)
    projectArray.push(newProject)
    return newProject
}

//need function that will get task.project when selecting a task to edit

let id = null
let dataKey = null

const div = document.querySelector('#task-list')
div.addEventListener('click', (e) => {
    if (e.target.matches('.task-p')) {
        const target = e.target.closest('.taskDiv')
        if (target) {
            id = e.target.parentElement.id
            id = id.slice(7)
            id = parseInt(id)
            dataKey = target.getAttribute('data-key')
            displayInputWindow(true, 'editWindow')
            editItem(dataKey, id)
        }
    }
    if (e.target.matches('.delete-btn')) {
        const target = e.target.closest('.task-div')
        if (target) {
            let dataKey = target.getAttribute('data-key')
            let id = target.id
            id = id.slice(3)
            id = parseInt(id)
            deleteItem(dataKey, id)
            wipeDiv('task-list')
            displayTask(dataKey)
        }
    }
})

const navButtons = document.querySelector('#nav-buttons')
navButtons.addEventListener('click', (e) => {
    if (e.target.matches('.add-task')) {
        displayInputWindow(true, 'inputWindow');
    }
    if (e.target.matches('.add-project')) {
        displayInputWindow(true, 'project-form-div')
    }
    if (e.target.matches('.project-btn')) {
        const target = e.target.closest('.project-btn')
        if (target) {
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
    if (e.target.matches('#submit-btn-project')) { //After projects div is wiped Home option is also wiped until page refresh. Home
        const newProject = createProject() //Home div is never stored in local storage
        storeItem('projectList', newProject)
        wipeDiv('project-list')
        wipeProjectOptions  ('projects')
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
        storeEditItem(dataKey, id) //adjust func to get data-key value from dom
        displayInputWindow(false, 'editWindow')
        clearForm('editTask-form')
        wipeDiv('task-list')
        displayTask(dataKey)
        e.preventDefault()
    }
    if (e.target.matches('#close-btn-edit')) {
        displayInputWindow(false, 'editWindow')
        clearForm('editTask-form')
        e.preventDefault()
    }
})

