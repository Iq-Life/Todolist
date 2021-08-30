import {combineReducers, createStore, applyMiddleware} from "redux";
import thunkMiddleware from "redux-thunk";
import { authReducer } from "../features/login/login-reducer";
import { tasksReducer } from "../features/todolists/tasks/tasks-reducer";
import { todolistReducer } from "../features/todolists/todolist-reducer";
import { appReducer } from "./app-reducer";



export const rootReducer = combineReducers({
    todolists: todolistReducer,
    tasks: tasksReducer,
    app : appReducer,
    auth: authReducer
})

export type AppRootStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))
