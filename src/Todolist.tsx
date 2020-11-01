import React from "react";
import s from './Todolist.module.css'
import {FilterValueType} from "./App";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTasks: (id:number) => void
    changeFilter: (value: FilterValueType) => void
}

export function Todolist(props: PropsType) {


    return (
        <div className={s.Todo}>
            <h3>{props.title}</h3>
            <input className={s.input}/>
            <button className={s.but_add}>add</button>
            <ul className={s.ul}>
                {props.tasks.map( t => <li>
                    <input type="checkbox" checked={t.isDone}/>
                    <span className={s.ul_span}>{t.title}</span>
                    <button className={s.but_del} onClick={ () => {props.removeTasks(t.id)}}>[X]</button>
                </li>)}
            </ul>
            <button onClick={() => props.changeFilter("all") }>All</button>
            <button onClick={() => props.changeFilter("active") }>Active</button>
            <button onClick={() => props.changeFilter("completed") }>Completed</button>
        </div>
    )
}