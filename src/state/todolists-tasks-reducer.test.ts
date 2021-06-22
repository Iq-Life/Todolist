import {addTodolistAC, setTodolistsAC, TodolistDomainType, todolistReducer} from "./todolist-reducer";
import {tasksReducer, TasksStateType} from "./tasks-reducer";
import { TodolistType } from "../api/todolists-api";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodolistsState: Array<TodolistDomainType> = []

    let todolist: TodolistType = {
        title: 'new todolist',
        id: 'any id',
        addedDate: '',
        order: 0
    }
    const action = addTodolistAC(todolist)

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodoListsState = todolistReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodoLists = endTodoListsState[0].id

    expect(idFromTasks).toBe(action.todolist.id)
    expect(idFromTodoLists).toBe(action.todolist.id)
});

