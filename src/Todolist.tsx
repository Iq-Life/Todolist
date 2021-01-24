import React, {ChangeEvent} from "react";
import s from './Todolist.module.css'
import {FilterValueType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";


export type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    colorFilter: FilterValueType
    removeTodoList: (todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    removeTasks: (id: string, todoListId: string) => void
    changeFilter: (value: FilterValueType, todoListId: string) => void
    changeTaskTitle:(id: string, title: string, todoListId: string) => void
    changeStatus: (id: string, isDone: boolean, todoListId: string) => void
    changeTodoListTitle:(title: string, todoListId: string) => void
}

export function Todolist(props: PropsType) {

    const tasks = props.tasks.map(t => {

        const onClickHandler = () => props.removeTasks(t.id, props.id)
        const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {props.changeStatus(t.id, e.currentTarget.checked, props.id)}
        const changeTitle = (title:string) => props.changeTaskTitle(t.id, title, props.id)

        return <li key={t.id} className={t.isDone ? s.is_done : ""}>
            {/*<input type="checkbox" checked={t.isDone} onChange={onChangeStatus}/>*/}
            <Checkbox
                checked={t.isDone}
                onChange={onChangeStatus}
                size="small"
                color='primary'
            />
            <EditableSpan changeTitle={changeTitle} title={t.title}/>
            <IconButton className={s.but_del} aria-label="delete" size="small" color='primary' onClick={onClickHandler}>
                <Delete/>
            </IconButton>
        </li>
    })

    const removeTodoList = () => props.removeTodoList(props.id)
    const addTask = (title:string) => { props.addTask(title, props.id)}
    const changeFilterAll = () => props.changeFilter("all", props.id)
    const changeFilterActive = () => props.changeFilter("active", props.id)
    const changeFilterCompleted = () => props.changeFilter("completed", props.id)
    const changeTodoListTitle =(title:string) => props.changeTodoListTitle(title, props.id)

    return <div className={s.Todo}>
        <h3>
        <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
            <IconButton className={s.ButDelTL} aria-label="delete" size="small" color='inherit' onClick={removeTodoList}>
                <Delete/>
            </IconButton>

        </h3>
        <AddItemForm addItem={addTask} />
        <ul className={s.ul}>
            {tasks}
            <button className={props.colorFilter === "all" ? "active-filter" : ""}
                    onClick={changeFilterAll}>All
            </button>
            <button className={props.colorFilter === "active" ? "active-filter" : ""}
                    onClick={changeFilterActive}>Active
            </button>
            <button className={props.colorFilter === "completed" ? "active-filter" : ""}
                    onClick={changeFilterCompleted}>Completed
            </button>
        </ul>
    </div>
}