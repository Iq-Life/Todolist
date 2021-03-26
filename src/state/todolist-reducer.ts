import {FilterValueType, TodoListType} from "../App";
import {v1} from "uuid";

export type RemoveTodoListAT = {
    type: "REMOVE-TODOLIST",
    id: string
}
export type AddTodoListAT = {
    type: "ADD-TODOLIST",
    title: string
}
export type ChangeTodoListTitleAT = {
    type: "CHANGE-TODOLIST-TITLE",
    title: string,
    id: string
}
export type ChangeTodoListFilterAT = {
    type: "CHANGE-TODOLIST-Filter",
    filter: FilterValueType,
    id: string
}

export type ActionType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListTitleAT | ChangeTodoListFilterAT

export const todoListReducer = (state: Array<TodoListType>, action: ActionType):  Array<TodoListType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.id)
        case "ADD-TODOLIST":
            const newTodoList: TodoListType = {
                id: v1(),
                title: action.title,
                filter: "all"
            }
            return [...state, newTodoList]
        case "CHANGE-TODOLIST-TITLE": {
            const todoList = state.find(tl => tl.id === action.id)
            if (todoList) {
                todoList.title = action.title
                return [...state]
            }
            return state
        }
        case "CHANGE-TODOLIST-Filter":
            const todoList = state.find(tl => tl.id === action.id)
            if (todoList) {
                todoList.filter = action.filter
                return [...state]
            }
            return state
        default:
            return state
    }
}

export const RemoveTodoListAC = (todoListId: string) : RemoveTodoListAT => ({ type: "REMOVE-TODOLIST", id: todoListId})
export const AddTodoListAC = (todoListTitle: string) : AddTodoListAT => ({ type: "ADD-TODOLIST", title: todoListTitle})