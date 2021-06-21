import {addTodoListAC, setTodoListsAC, TodolistDomainType, todoListReducer} from "./todolist-reducer";
import {tasksReducer, TasksStateType} from "./tasks-reducer";
import { TodolistType } from "../api/todolists-api";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodoListsState: Array<TodolistDomainType> = []

    let todolist: TodolistType = {
        title: 'new todolist',
        id: 'any id',
        addedDate: '',
        order: 0
    }
    const action = addTodoListAC(todolist)

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodoListsState = todoListReducer(startTodoListsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodoLists = endTodoListsState[0].id

    expect(idFromTasks).toBe(action.todolist.id)
    expect(idFromTodoLists).toBe(action.todolist.id)
});

