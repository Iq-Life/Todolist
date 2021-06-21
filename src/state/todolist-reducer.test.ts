import {v1} from "uuid";
import { TodolistType } from "../api/todolists-api";
import {addTodoListAC, changeTodoListFilterAC, changeTodoListTitleAC, FilterValueType,
    removeTodoListAC, setTodoListsAC, TodolistDomainType, todoListReducer} from "./todolist-reducer";

let todolistId1: string
let todolistId2: string
let startState: Array<TodolistDomainType>

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()
    startState = [
        {id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}
    ]
})


test("correct todolist should be removed", () => {

    const endState = todoListReducer(startState, removeTodoListAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test("correct todolist should be add", () => {
    let todolist: TodolistType = {
        title: 'New Todolist',
        id: 'any id',
        addedDate: '',
        order: 0
    }

    const endState = todoListReducer(startState, addTodoListAC(todolist))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(todolist.title)
    expect(endState[0].filter).toBe('all')
})

test("correct todolist should change it's name", () => {

    const newTodolistTitle = "New TodoList"

    const action = changeTodoListTitleAC(todolistId2, newTodolistTitle)
    const endState = todoListReducer(startState, action)

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe("New TodoList")
})

test("correct filter of todolist should be changed", () => {

    const newFilter: FilterValueType = "completed"

    const action = changeTodoListFilterAC(todolistId1, newFilter)
    const endState = todoListReducer(startState, action)

    expect(endState[0].filter).toBe("completed");
    expect(endState[1].filter).toBe("all")
})
test("todolists should be set to the state", () => {

    const action = setTodoListsAC(startState)

    const endState = todoListReducer([], action)

    expect(endState.length).toBe(2);
})


