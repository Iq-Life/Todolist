import React, {ChangeEvent} from "react";
import s from './Todolist.module.css'
import {FilterValueType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';


export type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    colorFilter: FilterValueType
    removeTodoList: (todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    removeTasks: (id: string, todoListId: string) => void
    changeFilter: (value: FilterValueType, todoListId: string) => void
    changeTaskTitle: (id: string, title: string, todoListId: string) => void
    changeStatus: (id: string, isDone: boolean, todoListId: string) => void
    changeTodoListTitle: (title: string, todoListId: string) => void
}

export function Todolist(props: PropsType) {

    const tasks = props.tasks.map(t => {
        const onClickHandler = () => props.removeTasks(t.id, props.id)
        const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeStatus(t.id, e.currentTarget.checked, props.id)
        }
        const changeTitle = (title: string) => props.changeTaskTitle(t.id, title, props.id)

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
            <IconButton className={s.but_del} aria-label="delete" size="small" color='default' onClick={onClickHandler}>
                <Delete/>
            </IconButton>
        </li>
    })


    const removeTodoList = () => props.removeTodoList(props.id)
    const addTask = (title: string) => {props.addTask(title, props.id)}
    const changeFilterAll = () => props.changeFilter("all", props.id)
    const changeFilterActive = () => props.changeFilter("active", props.id)
    const changeFilterCompleted = () => props.changeFilter("completed", props.id)
    const changeTodoListTitle = (title: string) => props.changeTodoListTitle(title, props.id)

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

        <h2 style={{display: "flex", justifyContent: "center", marginTop: "0",
            fontFamily: "Bradley Hand, cursive", marginBottom: "5px"}}>
            <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
        </h2>

        <AddItemForm addItem={addTask}/>
        <ul style={{fontFamily: "Bradley Hand, cursive",paddingLeft: "0", marginBottom: "0"}}>
            {tasks}
            <div style={{display: "flex", justifyContent: "center", marginTop: "10px"}}>
            <Button variant={props.colorFilter === "all" ? "contained" : "text"}
                    onClick={changeFilterAll}>All
            </Button>
            <Button variant={props.colorFilter === "active" ? "contained" : "text"}
                    color={"primary"}
                    onClick={changeFilterActive}>Active
            </Button>
            <Button variant={props.colorFilter === "completed" ? "contained" : "text"}
                    color={"secondary"}
                    onClick={changeFilterCompleted}>Completed
            </Button>
            </div>
        </ul>
    </div>
}