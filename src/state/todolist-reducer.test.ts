import {v1} from "uuid";
import {addTodoListAC, changeTodoListFilterAC, changeTodoListTitleAC,
    removeTodoListAC, todoListReducer} from "./todolist-reducer";
import {FilterValueType, TodoListType} from "../App";

let todoListId1 = v1()
let todoListId2 = v1()

let startState: Array<TodoListType>
    beforeEach(() => {
        startState = [
            {id: todoListId1, title: "Film", filter: "all"},
            {id: todoListId2, title: "Music", filter: "all"}
        ]
    })


test("correct todolist should be removed", () => {

    const endState = todoListReducer(startState, removeTodoListAC(todoListId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todoListId2)
})

test("correct todolist should be add", () => {

    const newTodoListTitle = "New TodoList"

    const endState = todoListReducer(startState, addTodoListAC(newTodoListTitle))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodoListTitle)
})

test("correct todolist should change it's name", () => {

    const newTodoListTitle = "New TodoList"

    const action = changeTodoListTitleAC(todoListId2, newTodoListTitle)
    const endState = todoListReducer(startState, action)

    expect(endState[0].title).toBe("Film");
    expect(endState[1].title).toBe(newTodoListTitle)
})

test("correct filter of todolist should be changed", () => {

    const newFilter: FilterValueType = "completed"

    const action = changeTodoListFilterAC(todoListId1, newFilter)
    const endState = todoListReducer(startState, action)
    expect(endState[0].filter).toBe(newFilter);
    expect(endState[1].filter).toBe("all")
})

