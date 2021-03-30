import {TasksStateType, TaskType} from "../App";
import {v1} from "uuid";
import {addTodoListAC, removeTodoListAC} from "./todolist-reducer";

type ActionsType = ReturnType<typeof removeTaskAC> | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskStatusAC> | ReturnType<typeof changeTitleTaskStatusAC>
    | ReturnType<typeof addTodoListAC> | ReturnType<typeof removeTodoListAC>

export const tasksReducer = (state: TasksStateType, action: ActionsType) => {
    switch (action.type) {
        case "REMOVE-TASKS":
            return {
                ...state,
                [action.todolistId]: [...state[action.todolistId].filter(t => t.id !== action.taskId)]
            }
        case "ADD-TASKS": {
            /*const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId]*/
            const newTask: TaskType = {id: action.taskId, title: action.title, isDone: false}
            /*const tasksCopy = [newTask, ...tasks]
            stateCopy[action.todolistId] = tasksCopy
            return stateCopy*/
            return {...state, [action.todolistId]: [newTask, ...state[action.todolistId]]}
        }
        case "CHANGE-TASK-STATUS": {
            return {
                ...state, [action.todolistId]: [...state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, isDone: action.isDone} : t)]
            }
        }
        case "CHANGE-TITLE-TASK": {
            return {
                ...state, [action.todolistId]: [...state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, title: action.title} : t)]
            }
        }
        case "ADD-TODOLIST": {
            const stateCopy = {...state}
            stateCopy[action.todoListId] = []
            return stateCopy
        }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.todolistId]
            return stateCopy
        }
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {type: "REMOVE-TASKS", taskId, todolistId} as const
}
export const addTaskAC = (title: string, todolistId: string) => {
    return {type: "ADD-TASKS", title, todolistId, taskId: v1()} as const
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) => {
    return {type: "CHANGE-TASK-STATUS", taskId, isDone, todolistId} as const
}
export const changeTitleTaskStatusAC = (taskId: string, title: string, todolistId: string) => {
    return {type: "CHANGE-TITLE-TASK", taskId, title, todolistId} as const
}

