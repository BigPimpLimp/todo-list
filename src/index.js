import './style.css';
import { displayInputWindow, displayNewTask, clearForm } from './dom';

console.log('Yeet');

export class task {
    static counter = 0;
    constructor(title, description, dueDate, priority, notes) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.id = task.counter++;
    }  
}

(function btnListener() {
    const taskBtn = document.getElementById('task-btn');
    taskBtn.addEventListener('click', () => {
        displayInputWindow(true);
    })
    const submitBtn = document.getElementById('submit-btn');
    submitBtn.addEventListener('click', (e) => {
        const newTask = createTask();
        storeItem('tasklist', newTask);
        displayNewTask(newTask)
        displayInputWindow(false);
        clearForm()
        e.preventDefault();
    })
    const closeBtn = document.getElementById('close-btn');
    closeBtn.addEventListener('click', (e) => {
        displayInputWindow(false)
        clearForm()
        e.preventDefault()
    })
})();

export function createElement(id, element, value, cssClass, ownId) {
    const content = document.getElementById(id);
    const container = document.createElement(element);
    container.innerHTML = value;
    content.appendChild(container);
    container.setAttribute('class', cssClass);
    container.setAttribute('id', ownId);
    return container;
}

function createTask() {
    const newTask = new task(document.getElementById('title').value, document.getElementById('description').value, document.getElementById('datePicker').value, document.getElementById('priority').value, '')
    return newTask
}

function storeItem(key, value) {
    const taskArray = fetchItem(key)
    taskArray.push(value)
    localStorage.setItem(key, JSON.stringify(taskArray));
}

function deleteItem(key, index) {
    const taskArray = fetchItem(key)
    taskArray.splice(index, 1)
    localStorage.setItem(key, JSON.stringify(taskArray));
}

export function fetchItem(key) {
    return JSON.parse(localStorage.getItem(key));
 }
