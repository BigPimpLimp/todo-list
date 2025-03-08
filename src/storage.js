import { displayEditTask } from "./dom";
import { editTask } from './index'

export function storeItem(key, value) {
    const arr = fetchItem(key)
    if (arr == null) {
        let newArr = []
        newArr.push(value)
        localStorage.setItem(key, JSON.stringify(newArr));
        return
    }
    arr.push(value)
    localStorage.setItem(key, JSON.stringify(arr));
}

export function deleteItem(key, index) {
    let taskArray = fetchItem(key)
    console.log(taskArray)
    taskArray.splice(index, 1)
    console.log(taskArray)
    localStorage.setItem(key, JSON.stringify(taskArray));
}

export function deleteKey(key) {
    removeItem(key)
}

export function fetchItem(key) {
    return JSON.parse(localStorage.getItem(key));
}

export function editItem(key, index) {
    const taskObj = fetchItem(key)
    let obj = taskObj.splice(index, 1, undefined)
    displayEditTask(obj[0])
}

export function storeEditItem(key, index) {
    let taskObj = fetchItem(key)
    const newObj = editTask()
    taskObj.splice(index, 1, newObj)
    localStorage.setItem(key, JSON.stringify(taskObj))
}