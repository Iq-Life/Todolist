import React, {ChangeEvent, useCallback} from "react";
import s from './Todolist.module.css'
import {FilterValueType, TaskType} from "./AppWithRedux";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {addTaskAC, changeTaskStatusAC, changeTitleTaskStatusAC, removeTaskAC} from "./state/tasks-reducer";


export type PropsType = {
    id: string
    title: string
    filter: FilterValueType
    removeTodoList: (todoListId: string) => void
    changeFilter: (todoListId: string, value: FilterValueType) => void
    changeTodoListTitle: (title: string, todoListId: string) => void
}

export function Todolist(props: PropsType) {

    const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.id])
    const dispatch = useDispatch()


    const removeTodoList = () => props.removeTodoList(props.id)
    const addTask = useCallback((title: string) => dispatch(addTaskAC(title, props.id)),[])
    const changeFilterAll = () => props.changeFilter(props.id, "all")
    const changeFilterActive = () => props.changeFilter(props.id, "active")
    const changeFilterCompleted = () => props.changeFilter(props.id, "completed")
    const changeTodoListTitle = (title: string) => props.changeTodoListTitle(title, props.id)

    let allTodolistTasks = tasks
    let tasksForTodolist = allTodolistTasks
    if (props.filter === "completed") {
        tasksForTodolist = allTodolistTasks.filter(task => task.isDone)
    }
    if (props.filter === "active") {
        tasksForTodolist = allTodolistTasks.filter(task => !task.isDone)
    }

    return <div>
        <div style={{display: "flex", justifyContent: "flex-end"}}>
            <Button

                variant="outlined"
                color="secondary"
                startIcon={<DeleteForeverIcon/>}
                onClick={removeTodoList}
            >
            </Button>
        </div>

        <h2 style={{
            display: "flex", justifyContent: "center", marginTop: "0",
            fontFamily: "Bradley Hand, cursive", marginBottom: "5px"
        }}>
            <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
        </h2>

        <AddItemForm addItem={addTask}/>
        <ul style={{fontFamily: "Bradley Hand, cursive", paddingLeft: "0", marginBottom: "0"}}>
            {tasksForTodolist.map(t => {
                const onClickHandler = () => dispatch(removeTaskAC(t.id, props.id))
                const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                    dispatch(changeTaskStatusAC(t.id, e.currentTarget.checked, props.id))
                }
                const changeTitle = (title: string) => dispatch(changeTitleTaskStatusAC(t.id, title, props.id))

                return <li key={t.id} className={t.isDone ? s.is_done : ""}
                           style={{paddingLeft: "0", listStyleType: "none", margin: "0"}}>
                    <Checkbox
                        checked={t.isDone}
                        onChange={onChangeStatus}
                        size="small"
                        style={t.isDone ? {opacity: 0.9} : {opacity: 1}}
                        color='secondary'
                    />
                    <EditableSpan changeTitle={changeTitle} title={t.title}/>
                    <IconButton className={s.but_del} aria-label="delete" size="small" color='default'
                                onClick={onClickHandler}>
                        <Delete/>
                    </IconButton>
                </li>
            })}
            <div style={{display: "flex", justifyContent: "center", marginTop: "10px"}}>
                <Button variant={props.filter === "all" ? "contained" : "text"}
                        onClick={changeFilterAll}>All
                </Button>
                <Button variant={props.filter === "active" ? "contained" : "text"}
                        color={"primary"}
                        onClick={changeFilterActive}>Active
                </Button>
                <Button variant={props.filter === "completed" ? "contained" : "text"}
                        color={"secondary"}
                        onClick={changeFilterCompleted}>Completed
                </Button>
            </div>
        </ul>
    </div>
}