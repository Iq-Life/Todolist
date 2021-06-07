import React, {useCallback} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {addTodoListAC, changeTodoListFilterAC,
    changeTodoListTitleAC, removeTodoListAC,} from "./state/todolist-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type FilterValueType = "all" | "active" | "completed"

export type TodoListType = {
    id: string
    title: string
    filter: FilterValueType
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    const dispatch = useDispatch()
   const todoLists = useSelector<AppRootStateType, Array<TodoListType>>( state => state.todoLists)

    const changeTodoListTitle = useCallback((todoListId: string, title: string) => {
        dispatch(changeTodoListTitleAC(todoListId, title))
    }, [dispatch])

    const changeFilter = useCallback((todoListId: string, value: FilterValueType) => {
        dispatch(changeTodoListFilterAC(todoListId, value))
    }, [dispatch])

    const removeTodoList = useCallback((todoListId: string) => {
        const action = removeTodoListAC(todoListId)
        dispatch(action)

    }, [dispatch])

const addTodoList = useCallback((title: string) => {
        const action = addTodoListAC(title)
        dispatch(action)
    }, [dispatch])

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu></Menu>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>

                <Grid container style={{padding: "15px"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={4} style={{
                    display: "flex", justifyContent: "space-between",
                    flexWrap: "wrap", flexDirection: "row"
                }}>
                    <div style={{display: "flex", justifyContent: "space-around", flexWrap: "wrap"}}>
                        {todoLists.map(tl => {
                            return (
                                <Grid item spacing={4} style={{margin: "15px"}}>
                                    <Paper elevation={5} style={{padding: "15px", display: "flex"}}>
                                        <Todolist
                                            key={tl.id}
                                            id={tl.id}
                                            title={tl.title}
                                            filter={tl.filter}
                                            changeFilter={changeFilter}
                                            removeTodoList={removeTodoList}
                                            changeTodoListTitle={changeTodoListTitle}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        })}
                    </div>
                </Grid>
            </Container>
        </div>
    );
}

export default App;