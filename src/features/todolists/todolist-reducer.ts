import {Dispatch} from "redux";
import {v1} from "uuid";
import {todolistsAPI, TodolistType} from "../../api/todolists-api";


const initialState: Array<TodolistDomainType> = []

export const todolistReducer = (state: Array<TodolistDomainType> = initialState, action: ActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(tl => tl.id !== action.todoListId)
        }
        case "ADD-TODOLIST": {
            return [{...action.todolist, filter: "all"}, ...state]
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        }
        case "CHANGE-TODOLIST-FILTER": {
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        }
        case "SET_TODOLISTS": {
            return action.todolists.map(tl => ({...tl, filter: 'all'}))
        }
        default:
            return state
    }
}

//actions
export const removeTodolistAC = (id: string) => {
    return {type: "REMOVE-TODOLIST", todoListId: id} as const
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
export const setTodolistsAC = (todolists: Array<TodolistType>) => {
    return {type: "SET_TODOLISTS", todolists} as const
}

//thunks
export const fetchTodolistsTC = () => {
    return (dispatch: Dispatch) => {
        todolistsAPI.getTodolists().then((res) => {
            dispatch(setTodolistsAC(res.data))
        })
    }
}
export const removeTodolistTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.deleteTodolist(todolistId).then((res) => {
            dispatch(removeTodolistAC(todolistId))
        })
    }
}
export const addTodolistTC = (title: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.createTodolist(title).then(res => {
            const newTodolist = res.data.data.item
            dispatch(addTodolistAC(newTodolist))
        })
    }
}
export const changeTodolistTitleTC = (id: string, title: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.updateTodolist(id, title).then((res) => {
            dispatch(changeTodolistTitleAC(id, title))
        })
    }
}
export const updateTodolistTC = (id: string, title: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.updateTodolist(id, title).then((res) => {
            dispatch(changeTodolistTitleAC(id, title))
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

export type FilterValueType = "all" | "active" | "completed"
export type TodolistDomainType = TodolistType & { filter: FilterValueType }
