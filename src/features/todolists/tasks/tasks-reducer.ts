import {Dispatch} from "redux";
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from "../../../api/todolists-api";
import {
    RequestStatusType,
    setErrorAC,
    SetErrorActionType,
    SetErrorOrStatusType,
    setStatusAC,
    setStatusActionType
} from "../../../app/app-reducer";
import {AppRootStateType} from "../../../app/store";
import {
    addTodolistAC, AddTodolistActionType, removeTodolistAC, RemoveTodolistActionType,
    setTodolistsAC, SetTodolistsActionType
} from "../todolist-reducer";


const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASKS":
            return {...state, [action.todoListId]: state[action.todoListId].filter(t => t.id != action.taskId)}
        case "ADD-TASK":
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case "UPDATE-TASK":
            return {
                ...state, [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            }
        case "CHANGE-TASK-ENTITY-STATUS":
            return {
                ...state, [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, entityStatus: action.status} : t)
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
export const changeTaskEntityStatusAC = (todolistId: string, taskId: string, status: RequestStatusType) => {
    return {type: "CHANGE-TASK-ENTITY-STATUS", todolistId, taskId, status} as const
}
export const setTasksAC = (todolistId: string, tasks: Array<TaskType>) => {
    return {type: "SET-TASKS", todolistId, tasks} as const
}

//thuks
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch<ThunkDispatchType>) => {
    dispatch(setStatusAC('loading'))
    todolistsAPI.getTasks(todolistId).then(res => {
        const tasks = res.data.items
        dispatch(setTasksAC(todolistId, tasks))
        dispatch(setStatusAC('succeeded'))
    })
}
export const removeTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch<ThunkDispatchType>) => {
    dispatch(setStatusAC('loading'))
    dispatch(changeTaskEntityStatusAC(todolistId, taskId, 'loading'))
    todolistsAPI.deleteTask(todolistId, taskId).then(res => {
        dispatch(removeTaskAC(todolistId, taskId))
        dispatch(setStatusAC('succeeded'))
    })
        .catch((error) => {
            dispatch(setErrorAC(error.message))
            dispatch(setStatusAC('failed'))
        })
}
export const addTaskTC = (title: string, todolistId: string) => {
    return (dispatch: Dispatch<ThunkDispatchType>) => {
        dispatch(setStatusAC('loading'))
        todolistsAPI.createTask(title, todolistId).then(res => {
            if (res.data.resultCode === 0) {
                const task = res.data.data.item
                dispatch(addTaskAC(task))
                dispatch(setStatusAC('succeeded'))
            } else {
                if (res.data.messages.length) {
                    dispatch(setErrorAC(res.data.messages[0]))
                } else {
                    dispatch(setErrorAC('Some error occurred'))
                }
                dispatch(setStatusAC('failed'))

            }
        })
            .catch((error) => {
                dispatch(setErrorAC(error.message))
                dispatch(setStatusAC('failed'))
            })
    }
}
export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType) =>
    (dispatch: Dispatch<ThunkDispatchType>, getState: () => AppRootStateType) => {
        dispatch(setStatusAC('loading'))
        const state = getState()
        const task = state.tasks[todolistId].find(t => t.id === taskId)
        if (!task) {
            throw new Error("task not found in the state")
            dispatch(setStatusAC('failed'))
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
            if (res.data.resultCode === 0) {
                dispatch(updateTaskAC(todolistId, taskId, domainModel))
                dispatch(setStatusAC('succeeded'))
            } else {
                if (res.data.messages.length) {
                    dispatch(setErrorAC(res.data.messages[0]))
                } else {
                    dispatch(setErrorAC('Some error occurred'))
                }
                dispatch(setStatusAC('failed'))
            }
        })
    }


//types
type ThunkDispatchType = ActionsType | SetErrorOrStatusType
type ActionsType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof changeTaskEntityStatusAC>
    | SetErrorActionType
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export type TasksStateType = { [key: string]: Array<TaskType> }