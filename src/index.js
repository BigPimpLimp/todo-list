import './style.css';
import { displayInputWindow, displayTask } from './dom';

console.log('Yeet');

const arrTask = [];

export class task {
    constructor(title, description, dueDate, priority, notes) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
    } 
}
(function btnListener() {
    const taskBtn = document.getElementById('task-btn');
    taskBtn.addEventListener('click', () => {
        displayInputWindow(true);
    })
    const submitBtn = document.getElementById('submit-btn');
    submitBtn.addEventListener('click', (e) => {
        createTask(arrTask);
        storeItem('tasklist', arrTask);
        displayTask();
        displayInputWindow(false);
        e.preventDefault();

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

function getInput() {

}

function createTask(arr) {
    const newTask = new task(document.getElementById('title').value, document.getElementById('description').value, document.getElementById('datePicker').value, document.getElementById('priority').value)
    arr.push(newTask);
}

function storeItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}
