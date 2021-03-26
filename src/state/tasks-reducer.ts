import {TasksStateType, TaskType} from "../App";
import {v1} from "uuid";

type ActionsType = ReturnType<typeof removeTaskAC> | ReturnType<typeof addTaskAC>
| ReturnType<typeof changeTaskStatusAC>

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
            return {...state, [action.todolistId]: [newTask, ...state[action.todolistId]]}}
        case "CHANGE-TASKS": {
            return {...state, [action.todolistId]: [...state[action.todolistId].map( t =>
                    t.id === action.taskId ? {...t, isDone: action.isDone} : t)]}
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
    return {type: "CHANGE-TASKS", taskId, isDone, todolistId} as const
}

