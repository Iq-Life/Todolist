import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import s from './AddItemForm.module.css'
import {Button} from "@material-ui/core";


type AddItemFormType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormType) {

    let [title, setTitle] = useState<string>("")
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (title.trim() !== "") {
            props.addItem(title.trim())
            setTitle("")
        } else {
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

    return <div>
        <input className={error ? s.error : s.input}
               value={title}
               onChange={onChange}
               onKeyPress={onKeyPress}/>
        <Button variant='text' color="primary" size="small" className={s.but_add} onClick={addTask}>
            add
        </Button>
        {error && <div className="error-message">{error}</div>}
    </div>
}