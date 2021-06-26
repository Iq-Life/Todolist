import {todolistReducer} from "./todolist-reducer";
import {tasksReducer} from "./tasks-reducer";
import {combineReducers, createStore, applyMiddleware} from "redux";
import thunkMiddleware from "redux-thunk";



export const rootReducer = combineReducers({
    todolists: todolistReducer,
    tasks: tasksReducer
})

export type AppRootStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))
