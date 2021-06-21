import {v1} from "uuid";
import {addTodoListAC, removeTodoListAC, setTodoListsAC, todoListId1, todoListId2} from "./todolist-reducer";

type ActionsType = ReturnType<typeof removeTaskAC> | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskStatusAC> | ReturnType<typeof changeTitleTaskStatusAC>
    | ReturnType<typeof addTodoListAC> | ReturnType<typeof removeTodoListAC>
    | ReturnType<typeof setTodoListsAC>

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case "REMOVE-TASKS": {
            return {
                ...state, [action.todoListId]: [...state[action.todoListId]
                    .filter(t => t.id !== action.taskId)]
            }
        }
        case "ADD-TASKS": {
            const newTask: TaskType = {id: action.taskId, title: action.title, isDone: false}
            return {...state, [action.todoListId]: [newTask, ...state[action.todoListId]]}
        }
        case "CHANGE-TASK-STATUS": {
            return {
                ...state, [action.todoListId]: [...state[action.todoListId]
                    .map(t => t.id === action.taskId ? {...t, isDone: action.isDone} : t)]
            }
        }
        case "CHANGE-TITLE-TASK": {
            return {
                ...state, [action.todoListId]: [...state[action.todoListId]
                    .map(t => t.id === action.taskId ? {...t, title: action.title} : t)]
            }
        }
        case "ADD-TODOLIST": {
            return {...state, [action.todolist.id]: []}
        }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.todoListId]
            return stateCopy
        }
        case "SET-TODOLISTS" : {
            const copyState = {...state}
            action.todolists.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState
        }
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todoListId: string) => {
    return {type: "REMOVE-TASKS", taskId, todoListId} as const
}
export const addTaskAC = (title: string, todoListId: string) => {
    return {type: "ADD-TASKS", title, todoListId, taskId: v1()} as const
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todoListId: string) => {
    return {type: "CHANGE-TASK-STATUS", taskId, isDone, todoListId} as const
}
export const changeTitleTaskStatusAC = (taskId: string, title: string, todoListId: string) => {
    return {type: "CHANGE-TITLE-TASK", taskId, title, todoListId} as const
}

