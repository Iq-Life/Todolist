import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import AddBoxTwoToneIcon from '@material-ui/icons/AddBoxTwoTone';

type AddItemFormType = {
    addItem: (title: string) => void
    disabled?: boolean
}

export const AddItemForm = React.memo(({addItem, disabled = false}: AddItemFormType) => {

    let [title, setTitle] = useState<string>("")
    let [error, setError] = useState<string | null>(null)

    const addTask = useCallback(() => {
        if (title.trim() !== "") {
            addItem(title.trim())
            setTitle("")
        } else {
            setError("Title is required")
        }
    }, [addItem, title])

    const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }, [setTitle])

    const onKeyPress = useCallback(({charCode}: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }
        if (charCode === 13) {
            addTask()
        }
    }, [addTask, error])

    return <div>
        <TextField
            disabled={disabled}
            color={"primary"}
            label={"Type value"}
            error={!!error}
            helperText={error}
            value={title}
            onChange={onChange}
            onKeyPress={onKeyPress}
        />
        <IconButton color="primary"
                    size="small"
                    style={{marginLeft: "13px", marginTop: "16px"}}
                    onClick={addTask}
                    disabled={disabled}
        >
            <AddBoxTwoToneIcon/>
        </IconButton>
    </div>
})