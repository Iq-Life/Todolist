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
    changeStatus: (id: string, isDone: boolean) => void
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState("")
    let [error, setError] = useState <string | null> ( null)
    const addTask = () => {
        if (title.trim() !== "") {
            props.addTask(title)
            setTitle("")
        }else{
            setError("Title is required")
        }
    }
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPress = ({charCode}: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (charCode === 13) {
            addTask()
        }
    }
    const changeFilterAll = () => props.changeFilter("all")
    const changeFilterActive = () => props.changeFilter("active")
    const changeFilterCompleted = () => props.changeFilter("completed")
    return (
        <div className={s.Todo}>
            <h3>{props.title}</h3>
            <div>
                <input className={ error ? s.error : s.input }
                       value={title}
                       onChange={onChange}
                       onKeyPress={onKeyPress}/>
                <button className={s.but_add} onClick={addTask}>add</button>
                { error && <div className="error-message" >{error}</div>}
            </div>
            <ul className={s.ul}>
                {props.tasks.map(t => {
                    const onClickHandler = () => {
                        props.removeTasks(t.id)
                    }
                    const onChangeChangeH = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeStatus(t.id, newIsDoneValue)
                    }
                    return <li key={t.id}>
                        <input type="checkbox" checked={t.isDone} onChange={onChangeChangeH}/>
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