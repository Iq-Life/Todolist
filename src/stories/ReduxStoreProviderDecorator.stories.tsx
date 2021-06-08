import React from 'react'
import {Provider} from 'react-redux'
import {combineReducers, createStore} from 'redux'
import {tasksReducer} from '../state/tasks-reducer'
import {v1} from 'uuid'
import {AppRootStateType} from '../state/store'
import {todoListReducer} from "../state/todolist-reducer";
import '@storybook/addon-console';
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListReducer
})
export let todoListId1 = v1()
export let todoListId2 = v1()

const initialGlobalState: AppRootStateType = {
    todoLists: [
        {id: todoListId1, title: "Film", filter: "all"},
        {id: todoListId2, title: "Music", filter: "all"}
    ] ,
    tasks: {
        [todoListId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: false}
        ],
        [todoListId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Fish", isDone: false}
        ]
    }
};
export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType);
export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>)