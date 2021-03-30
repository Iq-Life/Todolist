import {FilterValueType, TodoListType} from "../App";
import {v1} from "uuid";

export type ActionType = ReturnType<typeof removeTodoListAC> | ReturnType<typeof addTodoListAC>
|  ReturnType<typeof changeTodoListTitleAC> | ReturnType<typeof changeTodoListFilterAC>

export const todoListReducer = (state: Array<TodoListType>, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(tl => tl.id !== action.todolistId)
        }
        case "ADD-TODOLIST": {
            return [...state, {id: v1(), title: action.title, filter: "all"}]
        }
        case "CHANGE-TODOLIST-TITLE": {
            const todoList = state.find(tl => tl.id === action.id)
            if (todoList) {
                todoList.title = action.title
            }
            return [...state]
        }
        case "CHANGE-TODOLIST-FILTER":
            const todoList = state.find(tl => tl.id === action.id)
            if (todoList) {
                todoList.filter = action.filter
            }
            return [...state]
        default:
            return state
    }
}

export const removeTodoListAC = (id: string) => {
    return {type: "REMOVE-TODOLIST", todolistId: id} as const
}
export const addTodoListAC = (title: string) => {
    return {type: "ADD-TODOLIST", title} as const
}
export const changeTodoListTitleAC = (id: string, title: string) => {
    return {type: "CHANGE-TODOLIST-TITLE", id, title} as const
}
export const changeTodoListFilterAC = (id: string, filter: FilterValueType) => {
    return {type: "CHANGE-TODOLIST-FILTER", id, filter} as const
}