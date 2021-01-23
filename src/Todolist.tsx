import React, {ChangeEvent} from "react";
import s from './Todolist.module.css'
import {FilterValueType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";

export type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    colorFilter: FilterValueType
    removeTodoList: (todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    removeTasks: (id: string, todoListId: string) => void
    changeFilter: (value: FilterValueType, todoListId: string) => void
    changeStatus: (id: string, isDone: boolean, todoListId: string) => void
}

export function Todolist(props: PropsType) {

    const tasks = props.tasks.map(t => {
        const onClickHandler = () => props.removeTasks(t.id, props.id)
        const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked;
            props.changeStatus(t.id, newIsDoneValue, props.id)
        }
        return <li key={t.id} className={t.isDone ? s.is_done : ""}>
            <input type="checkbox" checked={t.isDone} onChange={onChangeStatus}/>
            <span className={s.ul_span}>{t.title}</span>
            <button className={s.but_del} onClick={onClickHandler}>]X[</button>
        </li>
    })
    const addTask = (title:string) => { props.addTask(title, props.id)}
    const removeTodoList = () => props.removeTodoList(props.id)
    const changeFilterAll = () => props.changeFilter("all", props.id)
    const changeFilterActive = () => props.changeFilter("active", props.id)
    const changeFilterCompleted = () => props.changeFilter("completed", props.id)

    return <div className={s.Todo}>
        <h3>{props.title}
            <button onClick={removeTodoList}>x</button>
        </h3>
        <AddItemForm addTask={addTask} />
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