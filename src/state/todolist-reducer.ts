import {v1} from "uuid";
import { TodolistType } from "../api/todolists-api";

export type ActionType =
    ReturnType<typeof removeTodoListAC> | ReturnType<typeof addTodoListAC>
    | ReturnType<typeof changeTodoListTitleAC> | ReturnType<typeof changeTodoListFilterAC>
    | ReturnType<typeof setTodoListsAC>

export type FilterValueType = "all" | "active" | "completed"

export type TodolistDomainType = TodolistType & { filter: FilterValueType }

export let todoListId1 = v1()
export let todoListId2 = v1()

const initialState: Array<TodolistDomainType> = []

export const todoListReducer = (state: Array<TodolistDomainType> = initialState, action: ActionType): Array<TodolistDomainType> => {
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
            return action.todolists.map( tl => ({...tl, filter: 'all'}))
        }
        default:
            return state
    }
}

export const removeTodoListAC = (id: string) => {
    return {type: "REMOVE-TODOLIST", todoListId: id} as const
}
export const addTodoListAC = (todolist: TodolistType) => {
    return {type: "ADD-TODOLIST", todolist} as const
}
export const changeTodoListTitleAC = (id: string, title: string) => {
    return {type: "CHANGE-TODOLIST-TITLE", id, title} as const
}
export const changeTodoListFilterAC = (id: string, filter: FilterValueType) => {
    return {type: "CHANGE-TODOLIST-FILTER", id, filter} as const
}
export const setTodoListsAC = (todolists: Array<TodolistType>) => {
    return {type: "SET_TODOLISTS", todolists} as const
}