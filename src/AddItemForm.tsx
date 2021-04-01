import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import AddBoxTwoToneIcon from '@material-ui/icons/AddBoxTwoTone';

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
        <TextField
            color={"primary"}
            label={"Type value"}
            error={!!error}
            helperText={error}
            value={title}
            onChange={onChange}
            onKeyPress={onKeyPress}
        />
        <IconButton color="primary" size="small"
                style={{marginLeft: "13px", marginTop:"16px"}} onClick={addTask}>
            <AddBoxTwoToneIcon/>
        </IconButton>
    </div>
}