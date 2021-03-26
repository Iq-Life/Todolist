import {v1} from "uuid";
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
    todoListReducer
} from "./todolist-reducer";
import {FilterValueType, TodoListType} from "../App";


test("correct todolist should be removed", () => {
let todolistId1 = v1()
let todolistId2 = v1()

    const startState: Array<TodoListType> = [
        {id: todoListId1, title: "Film", filter: "all"},
        {id: todoListId2, title: "Music", filter: "all"}
    ]

    const endState = todoListReducer(startState, removeTodoListAC(todoListId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todoListId2)
})

test("correct todolist should be add", () => {
    let todoListId1 = v1()
    let todoListId2 = v1()

    const newTodoListTitle = "New TodoList"

    const startState: Array<TodoListType> = [
        {id: todoListId1, title: "Film", filter: "all"},
        {id: todoListId2, title: "Music", filter: "all"}
    ]

    const endState = todoListReducer(startState, addTodoListAC(newTodoListTitle))

    expect(endState.length).toBe(3)
    expect(endState[2].id).toBe(newTodoListTitle)
})

test("correct todolist should change it's name", () => {
    let todoListId1 = v1()
    let todoListId2 = v1()

    const newTodoListTitle = "New TodoList"

    const startState: Array<TodoListType> = [
        {id: todoListId1, title: "Film", filter: "all"},
        {id: todoListId2, title: "Music", filter: "all"}
    ]

    const action = changeTodoListTitleAC(todoListId2, newTodoListTitle)
    const endState = todoListReducer(startState, action)

    expect(endState[0].title).toBe("Film");
    expect(endState[1].title).toBe(newTodoListTitle)
})

test("correct filter of todolist should be changed", () => {
    let todoListId1 = v1()
    let todoListId2 = v1()

    const newFilter: FilterValueType = "completed"

    const startState: Array<TodoListType> = [
        {id: todoListId1, title: "Film", filter: "all"},
        {id: todoListId2, title: "Music", filter: "all"}
    ]
    const action = changeTodoListFilterAC(todoListId1, newFilter)
    const endState = todoListReducer(startState, action)
    expect(endState[0].filter).toBe("all");
    expect(endState[1].title).toBe(newFilter)
})

