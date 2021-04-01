import React, {useReducer} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
} from "./state/todolist-reducer";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTitleTaskStatusAC,
    removeTaskAC,
} from "./state/tasks-reducer";
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
   const tasks = useSelector<AppRootStateType, TasksStateType>( state => state.tasks)

    function addTasks(title: string, todoListId: string) {
        dispatch(addTaskAC(title, todoListId))
    }

    function removeTasks(taskId: string, todoListId: string) {
        dispatch(removeTaskAC(taskId, todoListId))
    }

    function changeTaskStatus(taskId: string, isDone: boolean, todoListId: string) {
        dispatch(changeTaskStatusAC(taskId, isDone, todoListId))
    }

    function changeTaskTitle(taskId: string, title: string, todoListId: string) {
        const action = changeTitleTaskStatusAC(taskId, title, todoListId)
        dispatch(action)
    }

    function changeTodoListTitle(todoListId: string, title: string) {
        dispatch(changeTodoListTitleAC(todoListId, title))
    }

    function changeFilter(todoListId: string, value: FilterValueType) {
        dispatch(changeTodoListFilterAC(todoListId, value))
    }

    function removeTodoList(todoListId: string) {
        const action = removeTodoListAC(todoListId)
        dispatch(action)

    }

    function addTodoList(title: string) {
        const action = addTodoListAC(title)
        dispatch(action)
    }

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
                            let tasksForTodolist = tasks[tl.id];
                            if (tl.filter === "completed") {
                                tasksForTodolist = tasks[tl.id].filter(task => task.isDone)
                            }
                            if (tl.filter === "active") {
                                tasksForTodolist = tasks[tl.id].filter(task => !task.isDone)
                            }
                            return (
                                <Grid item spacing={4} style={{margin: "15px"}}>
                                    <Paper elevation={5} style={{padding: "15px", display: "flex"}}>
                                        <Todolist
                                            key={tl.id}
                                            id={tl.id}
                                            title={tl.title}
                                            colorFilter={tl.filter}
                                            tasks={tasksForTodolist}
                                            addTask={addTasks}
                                            removeTasks={removeTasks}
                                            changeFilter={changeFilter}
                                            removeTodoList={removeTodoList}
                                            changeTaskTitle={changeTaskTitle}
                                            changeStatus={changeTaskStatus}
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