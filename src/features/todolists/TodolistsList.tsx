import React, {useCallback, useEffect} from 'react';
import {Todolist} from "./Todolist";
import {AddItemForm} from "../../components/addItemForm/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC, changeTodolistFilterAC,
    changeTodolistTitleAC, fetchTodolistsTC, FilterValueType, removeTodolistAC, TodolistDomainType
} from "./todolist-reducer";
import {useDispatch, useSelector} from "react-redux";
import {TaskStatuses} from '../../api/todolists-api';
import {addTaskTC, removeTaskTC, TasksStateType, updateTaskTC} from './tasks/tasks-reducer';
import {AppRootStateType} from '../../app/store';
import {addTodolistTC, changeTodolistTitleTC, removeTodolistTC} from './todolist-reducer';
import { Redirect } from 'react-router';

export const TodolistsList: React.FC<TodoListsListType> = ({demo = false}) => {

    const dispatch = useDispatch()
    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state=> state.auth.isLoggedIn)

    

    useEffect(() => {
        if(!demo || !isLoggedIn){
        dispatch(fetchTodolistsTC())
        }
    }, [])

    const removeTask = useCallback(function (todolistId: string, id: string) {
        const thunk = removeTaskTC(todolistId, id)
        dispatch(thunk)
    }, [dispatch])
    const addTask = useCallback((todolistId: string, title: string) => {
        dispatch(addTaskTC(todolistId, title))
    }, [dispatch])
    const changeTaskStatus = useCallback((todolistId: string, id: string, status: TaskStatuses) => {
        const thunk = updateTaskTC(todolistId, id, {status})
        dispatch(thunk)
    }, [dispatch])
    const changeTaskTitle = useCallback((todolistId: string, id: string, newTitle: string) => {
        const thunk = updateTaskTC(todolistId, id, {title: newTitle})
        dispatch(thunk)
    }, [dispatch])

    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodolistTC(todolistId))
    }, [dispatch])
    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [dispatch])
    const changeTodolistTitle = useCallback((todolistId: string, title: string) => {
        dispatch(changeTodolistTitleTC(todolistId, title))
    }, [dispatch])

    const changeFilter = useCallback((todolistId: string, value: FilterValueType) => {
        dispatch(changeTodolistFilterAC(todolistId, value))
    }, [dispatch])

    if(!isLoggedIn){
        return <Redirect to={"/login"} />
    }

    return <>
        <Grid container style={{padding: "15px"}}>
            <AddItemForm addItem={addTodolist}/>
        </Grid>
        <Grid container spacing={4} style={{
            display: "flex", justifyContent: "space-between",
            flexWrap: "wrap", flexDirection: "row"
        }}>
            <div style={{display: "flex", justifyContent: "space-around", flexWrap: "wrap"}}>
                {todolists.map(tl => {

                    let allTodolistTasks = tasks[tl.id] || []
                    return (
                        <Grid item spacing={4} style={{margin: "15px"}}>
                            <Paper elevation={5} style={{padding: "15px", display: "flex"}}>
                                <Todolist
                                    todolist={tl}
                                    tasks={allTodolistTasks}
                                    removeTask={removeTask}
                                    addTask={addTask}
                                    changeTaskStatus={changeTaskStatus}
                                    changeTaskTitle={changeTaskTitle}
                                    removeTodolist={removeTodolist}
                                    changeTodolistTitle={changeTodolistTitle}
                                    changeFilter={changeFilter}
                                    demo={demo}
                                />
                            </Paper>
                        </Grid>
                    )
                })}
            </div>
        </Grid>
    </>
}

//type
type TodoListsListType = { demo?: boolean }