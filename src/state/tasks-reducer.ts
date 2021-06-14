import {TasksStateType, TaskType} from "../AppWithRedux";
import {v1} from "uuid";
import {addTodoListAC, removeTodoListAC, todoListId1, todoListId2} from "./todolist-reducer";

type ActionsType = ReturnType<typeof removeTaskAC> | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskStatusAC> | ReturnType<typeof changeTitleTaskStatusAC>
    | ReturnType<typeof addTodoListAC> | ReturnType<typeof removeTodoListAC>

const initialState: TasksStateType = {
    [todoListId1]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: false},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Redax", isDone: false}
    ],
    [todoListId2]: [
        {id: v1(), title: "Milk", isDone: true},
        {id: v1(), title: "Fish", isDone: false},
        {id: v1(), title: "Beer", isDone: false},
        {id: v1(), title: "Juice", isDone: false}
    ]
}


export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case "REMOVE-TASKS": {
            return {...state, [action.todoListId]: [...state[action.todoListId]
                    .filter(t => t.id !== action.taskId)]}
        }
        case "ADD-TASKS": {
            const newTask: TaskType = {id: action.taskId, title: action.title, isDone: false}
            return {...state, [action.todoListId]: [newTask, ...state[action.todoListId]]}
        }
        case "CHANGE-TASK-STATUS": {
            return {...state, [action.todoListId]: [...state[action.todoListId]
                    .map(t => t.id === action.taskId ? {...t, isDone: action.isDone} : t)]}
        }
        case "CHANGE-TITLE-TASK": {
            return {...state, [action.todoListId]: [...state[action.todoListId]
                    .map(t => t.id === action.taskId ? {...t, title: action.title} : t)]}
        }
        case "ADD-TODOLIST": {
            const stateCopy = {...state}
            stateCopy[action.todoListId] = []
            return stateCopy
        }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.todoListId]
            return stateCopy
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

