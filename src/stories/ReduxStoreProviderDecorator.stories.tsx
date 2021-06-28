import React from 'react'
import {Provider} from 'react-redux'
import {combineReducers, createStore} from 'redux'
import {v1} from 'uuid'
import '@storybook/addon-console';
import {TaskPriorities, TaskStatuses } from '../api/todolists-api'
import { tasksReducer } from '../features/todolists/tasks/tasks-reducer';
import { todolistReducer } from '../features/todolists/todolist-reducer';
import { AppRootStateType } from '../app/store';
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todolistReducer
})

const initialGlobalState: AppRootStateType = {
    todolists: [
        {id: "todoListId1", title: "Film", filter: "all", addedDate: '', order: 0},
        {id: "todoListId2", title: "Music", filter: "all", addedDate: '', order: 0}
    ] ,
    tasks: {
        ["todolistId1"]: [
            {id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed, todolistId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {id: v1(), title: "JS", status: TaskStatuses.Completed, todolistId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low}
        ],
        ["todolistId2"]: [
            {id: v1(), title: "Milk", status: TaskStatuses.Completed, todolistId: "todolistId2", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {id: v1(), title: "React Book", status: TaskStatuses.Completed, todolistId: "todolistId2", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low}
        ]
    }
};
export const storyBookStore = createStore(rootReducer, initialGlobalState);
export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>)
