import React, {useState} from "react";
import s from './Todolist.module.css'
import {PropsType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}



export function Todolist(props: PropsType) {
let [title, setTitle] = useState("")
    return (
        <div className={s.Todo}>
            <h3>{props.title}</h3>
            <input className={s.input}/>
            <button className={s.but_add} onClick={props.addTask}>add</button>
            <ul className={s.ul}>
                {props.tasks.map(t => (
                    <li>
                        <input type="checkbox" checked={t.isDone}/>
                        <span className={s.ul_span}>{title}</span>
                        <button className={s.but_del} onClick={() => {props.removeTasks(t.id)}}>[X]</button>
                    </li>
                ))}
            </ul>
            <button onClick={() => props.changeFilter("all")}>All</button>
            <button onClick={() => props.changeFilter("active")}>Active</button>
            <button onClick={() => props.changeFilter("completed")}>Completed</button>
        </div>
    )
}