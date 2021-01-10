import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import s from './Todolist.module.css'
import {FilterValueType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTasks: (id: string) => void
    changeFilter: (value: FilterValueType) => void
    addTask: (title: string) => void
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState("")

    const addTask = () => {
        props.addTask(title)
        setTitle("")
    }
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {setTitle(e.currentTarget.value)}
    const onKeyPress = ({charCode}: KeyboardEvent<HTMLInputElement>) => {if (charCode === 13) {addTask()}}
    const changeFilterAll = () => props.changeFilter("all")
    const changeFilterActive = () => props.changeFilter("active")
    const changeFilterCompleted = () => props.changeFilter("completed")
    return (
        <div className={s.Todo}>
            <h3>{props.title}</h3>
            <div>
                <input className={s.input}
                       value={title}
                       onChange={onChange}
                       onKeyPress={onKeyPress}/>
                <button className={s.but_add} onClick={addTask}>add</button>
            </div>
            <ul className={s.ul}>
                {props.tasks.map(t => {
                    const onClickHandler = () => {props.removeTasks(t.id)}
                    return <li key={t.id}>
                        <input type="checkbox" checked={t.isDone}/>
                        <span className={s.ul_span}>{t.title}</span>
                        <button className={s.but_del} onClick={onClickHandler}>]X[</button>
                    </li>
                })}
            </ul>
            <button onClick={changeFilterAll}>All</button>
            <button onClick={changeFilterActive}>Active</button>
            <button onClick={changeFilterCompleted}>Completed</button>
        </div>
    )
}