import {todoListReducer} from "./todolist-reducer";
import {tasksReducer} from "./tasks-reducer";
import {combineReducers, createStore} from "redux";



export const rootReducer = combineReducers({
    todoLists: todoListReducer,
    tasks: tasksReducer
})

export type AppRootStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)

// 1 создаем рект прило;ение
// 2 подкл.чаешь стори,ук
// 3 перносишь срц и