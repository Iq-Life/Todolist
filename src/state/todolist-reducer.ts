import {FilterValueType, TodoListType} from "../AppWithRedux";
import {v1} from "uuid";

export type ActionType = ReturnType<typeof removeTodoListAC> | ReturnType<typeof addTodoListAC>
|  ReturnType<typeof changeTodoListTitleAC> | ReturnType<typeof changeTodoListFilterAC>
    | ReturnType<typeof setTodolistsAC>

const initialState: Array<TodoListType> = []

export const todoListReducer = (state: Array<TodoListType> = initialState, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(tl => tl.id !== action.todoListId)
        }
        case "ADD-TODOLIST": {
            return [...state, {id: action.todoListId, title: action.title, filter: "all"}]
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        }
        case "CHANGE-TODOLIST-FILTER": {
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        }
        case "SET-TODOLISTS": {
            return action.todolists.map(tl=> {
                return {...tl, filter:'all'}
            })
        }
        default:
            return state
    }
}

export const removeTodoListAC = (id: string) => {
    return {type: "REMOVE-TODOLIST", todoListId: id} as const
}
export const addTodoListAC = (title: string) => {
    return {type: "ADD-TODOLIST", title, todoListId: v1()} as const
}
export const changeTodoListTitleAC = (id: string, title: string) => {
    return {type: "CHANGE-TODOLIST-TITLE", id, title} as const
}
export const changeTodoListFilterAC = (id: string, filter: FilterValueType) => {
    return {type: "CHANGE-TODOLIST-FILTER", id, filter} as const
}
export const setTodolistsAC = (todolists: Array<TodoListType>) =>{
    return {type: "SET-TODOLISTS", todolists} as const
}