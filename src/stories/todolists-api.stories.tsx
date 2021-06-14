import React, {useEffect, useState} from "react";
import axios from 'axios'

export default {
    title: 'API'
}

const settings = {
    withCredentials: true,
    headers: {
        "api-key": "d9baecdc-1ca4-440c-8d10-aee3256853c8"
    }
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        axios.get("https://social-network.samuraijs.com/api/1.1/todo-lists", settings)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        axios.post("https://social-network.samuraijs.com/api/1.1/todo-lists", {title: 'Dimych todolist'}, settings)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        axios.delete("https://social-network.samuraijs.com/api/1.1/todo-lists/{idTodolist}", settings)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}

export const UpdateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        axios.put("https://social-network.samuraijs.com/api/1.1/todo-lists/{idTodolist}", {title: 'Dimych todolist'}, settings)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}