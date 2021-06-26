import {Dispatch} from "redux";
import {TaskPriorities, TaskStatuses, todolistsAPI} from "../api/todolists-api";
import {addTodolistAC, removeTodolistAC, setTodolistsAC} from "./todolist-reducer";


const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASKS":
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
        case "ADD-TASKS":
            return {...state, [action.task.todolistId]: [action.task, ...state[action.task.todolistId]]}
        case "UPDATE-TASK":
            return {
                ...state, [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            }
        case "ADD-TODOLIST":
            return {...state, [action.todolist.id]: []}
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
            return {...state, [action.todolistId]: action.tasks}
        }
        default:
            return state
    }
}

//actions
export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {type: "REMOVE-TASKS", taskId, todolistId} as const
}
export const addTaskAC = (task: TaskType) => {
    ({type: 'ADD-TASK', task} as const)
}
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) => {
    return {type: "UPDATE-TASK", taskId, model, todolistId} as const
}
export const setTasksAC = (todolistId: string, tasks: TaskType[]) => {
    return {type: "SET-TASKS", todolistId, tasks} as const
}

//thuks
export const fetchTodolistsTC = (todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistsAPI.getTasks(todolistId).then((res) => {
        const tasks = res.data.items
        const action = setTasksAC(todolistId, tasks)
        dispatch(action)
    })
}

//types
type ActionsType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof setTodolistsAC>
    | ReturnType<typeof setTasksAC>
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
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export type TasksStateType = { [key: string]: Array<TaskType> }