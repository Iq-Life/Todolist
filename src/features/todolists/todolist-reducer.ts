import {Dispatch} from "redux";
import {v1} from "uuid";
import {todolistsAPI, TodolistType} from "../../api/todolists-api";
import { setStatusAC, SetErrorOrStatusType, RequestStatusType } from "../../app/app-reducer";
import { handleServerNetworkError } from "../../utils/error-utils";


const initialState: Array<TodolistDomainType> = []

export const todolistReducer = (state: Array<TodolistDomainType> = initialState, action: ActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(tl => tl.id !== action.todolistId)
        }
        case "ADD-TODOLIST": {
            return [{...action.todolist, filter: "all", entityStatus: 'idle'}, ...state]
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        }
        case "CHANGE-TODOLIST-FILTER": {
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        }
        case "CHANGE-TODOLIST-ENTITY-STATUS": {
            return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.status} : tl)
        }
        case "SET_TODOLISTS": {
            return action.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        }
        default:
            return state
    }
}

//actions
export const removeTodolistAC = (todolistId: string) => {
    return {type: "REMOVE-TODOLIST", todolistId} as const
}
export const addTodolistAC = (todolist: TodolistType) => {
    return {type: "ADD-TODOLIST", todolist} as const
}
export const changeTodolistTitleAC = (id: string, title: string) => {
    return {type: "CHANGE-TODOLIST-TITLE", id, title} as const
}
export const changeTodolistFilterAC = (id: string, filter: FilterValueType) => {
    return {type: "CHANGE-TODOLIST-FILTER", id, filter} as const
}
export const changeTodolistEntityStatusAC = (id: string, status: RequestStatusType) => {
    return {type: "CHANGE-TODOLIST-ENTITY-STATUS", id, status} as const
}
export const setTodolistsAC = (todolists: Array<TodolistType>) => {
    return {type: "SET_TODOLISTS", todolists} as const
}

//thunks
export const fetchTodolistsTC = () => {
    return (dispatch: Dispatch<ThunkDispatchType>) => {
        dispatch(setStatusAC('loading'))
        todolistsAPI.getTodolists().then((res) => {
            dispatch(setTodolistsAC(res.data))
            dispatch(setStatusAC('succeeded'))
        })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
            })
    }
}
export const removeTodolistTC = (todolistId: string) => {
    return (dispatch: Dispatch<ThunkDispatchType>) => {
        dispatch(setStatusAC('loading'))
        dispatch(changeTodolistEntityStatusAC(todolistId,'loading'))
        todolistsAPI.deleteTodolist(todolistId).then((res) => {
            dispatch(removeTodolistAC(todolistId))
            dispatch(setStatusAC('succeeded'))
        })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
            })
    }
}
export const addTodolistTC = (title: string) => {
    return (dispatch: Dispatch<ThunkDispatchType>) => {
        dispatch(setStatusAC('loading'))
        todolistsAPI.createTodolist(title).then(res => {
            const newTodolist = res.data.data.item
            dispatch(addTodolistAC(newTodolist))
            dispatch(setStatusAC('succeeded'))
        })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
            })
    }
}
export const changeTodolistTitleTC = (id: string, title: string) => {
    return (dispatch: Dispatch<ThunkDispatchType>) => {
        todolistsAPI.updateTodolist(id, title).then((res) => {
            dispatch(changeTodolistTitleAC(id, title))
        })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
            })
    }
}
export const updateTodolistTC = (id: string, title: string) => {
    return (dispatch: Dispatch<ThunkDispatchType>) => {
        todolistsAPI.updateTodolist(id, title).then((res) => {
            dispatch(changeTodolistTitleAC(id, title))
        })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
            })
    }
}

// types
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>
export type ActionType =
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | AddTodolistActionType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof changeTodolistEntityStatusAC>
type ThunkDispatchType = ActionType | SetErrorOrStatusType
export type FilterValueType = "all" | "active" | "completed"
export type TodolistDomainType = TodolistType & {
    filter: FilterValueType
    entityStatus: RequestStatusType
}
