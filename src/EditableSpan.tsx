import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import s from './EditableSpan.module.css'


type EditableSpanType = {
    title: string
    changeTitle: (title: string) => void
}

export function EditableSpan(props: EditableSpanType) {

    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)

    const onEditMode = () => {
        setEditMode(true)
    }
    const offEditMode = () => {
        setEditMode(false)
        if (title.trim()) {
            props.changeTitle(title.trim())
        }
    }
    const onKeyPress = ({charCode}: KeyboardEvent<HTMLInputElement>) => {
        if (charCode === 13) {
            if (title.trim()) {
                props.changeTitle(title.trim())
            }
            setEditMode(false)
        }
    }
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    return editMode
        ? <input autoFocus={true} onBlur={offEditMode} value={title} onChange={onChange} onKeyPress={onKeyPress}/>
        : <span onDoubleClick={onEditMode} className={s.ul_span}>{props.title}</span>
}