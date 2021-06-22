import { Dispatch } from "redux";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses, todolistsAPI } from "../api/todolists-api";
import {addTodolistAC, removeTodolistAC, setTodolistsAC, todolistId1, todolistId2} from "./todolist-reducer";

type ActionsType = ReturnType<typeof removeTaskAC> | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskStatusAC> | ReturnType<typeof changeTitleTaskStatusAC>
    | ReturnType<typeof addTodolistAC> | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof setTodolistsAC> | ReturnType<typeof setTasksAC>

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todolistId: string
    order: number
    addedDate: string
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType):TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASKS": {
            return {
                ...state, [action.todolistId]: [...state[action.todolistId]
                    .filter(t => t.id !== action.taskId)]
            }
        }
        case "ADD-TASKS": {
            const newTask: TaskType = {id: action.taskId, title: action.title, isDone: false}
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
            return {...state, [action.todolist.id]: []}
        }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.todolistId]
            return stateCopy
        }
        case "SET-TODOLISTS" : {
            const copyState = {...state}
            action.todolists.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState
        }
        case "SET-TASKS" : {
            const copyState = {...state}
            copyState[action.todolistId] = action.tasks
        }
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {type: "REMOVE-TASKS", taskId, todolistId} as const
}
export const addTaskAC = (task: TaskType) => {
    ({type: 'ADD-TASK', task} as const)
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) => {
    return {type: "CHANGE-TASK-STATUS", taskId, isDone, todolistId} as const
}
export const changeTitleTaskStatusAC = (taskId: string, title: string, todolistId: string) => {
    return {type: "CHANGE-TITLE-TASK", taskId, title, todolistId} as const
}
export const setTasksAC = (todolistId: string, tasks:TaskType[]) => {
    return {type: "SET-TASKS", todolistId, tasks} as const
}

export const fetchTodolistsTC = (todolistId:string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.getTasks(todolistId).then((res) => {
            const tasks = res.data.items
            const action = setTasksAC(todolistId, tasks)
            dispatch(action)
        })
    }
}
