import {Dispatch} from "redux";
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from "../../../api/todolists-api";
import {AppRootStateType} from "../../../app/store";
import {addTodolistAC, AddTodolistActionType, removeTodolistAC, RemoveTodolistActionType,
    setTodolistsAC, SetTodolistsActionType} from "../todolist-reducer";


const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASKS":
            return {...state, [action.todoListId]: state[action.todoListId].filter(t => t.id != action.taskId)}
        case "ADD-TASK":
            return {...state, [action.task.todoListId] : [action.task, ...state[action.task.todoListId]]}
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
        case "SET_TODOLISTS" : {
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
export const removeTaskAC = (todoListId: string, taskId: string) => {
    return {type: "REMOVE-TASKS", todoListId, taskId} as const
}
export const addTaskAC = (task: TaskType) => {
    return {type: 'ADD-TASK', task} as const
}
export const updateTaskAC = (todolistId: string, taskId: string, model: UpdateDomainTaskModelType) => {
    return {type: "UPDATE-TASK", todolistId, taskId, model} as const
}
export const setTasksAC = (todolistId: string, tasks: Array<TaskType>) => {
    return {type: "SET-TASKS", todolistId, tasks} as const
}

//thuks
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    todolistsAPI.getTasks(todolistId).then(res => {
        const tasks = res.data.items

        const action = setTasksAC(todolistId, tasks)
        dispatch(action)
    })
}
export const removeTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    todolistsAPI.deleteTask(todolistId, taskId).then(res => {
        dispatch(removeTaskAC(todolistId, taskId))
    })
}
export const addTaskTC = (title: string, todolistId: string) => (dispatch: Dispatch) => {
    todolistsAPI.createTask(title, todolistId).then(res => {
        const task = res.data.data.item

        dispatch(addTaskAC(task))
    })
}
export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {

        const state = getState()
        const task = state.tasks[todolistId].find(t => t.id === taskId)
        if (!task) {
            throw new Error("task not found in the state")
            return
        }
        const apiModel: UpdateTaskModelType = {
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            ...domainModel
        }
        todolistsAPI.updateTask(todolistId, taskId, apiModel).then(res => {
            dispatch(updateTaskAC(todolistId, taskId, domainModel))
        })
    }


//types
type ActionsType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | ReturnType<typeof setTasksAC>
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export type TasksStateType = { [key: string]: Array<TaskType> }