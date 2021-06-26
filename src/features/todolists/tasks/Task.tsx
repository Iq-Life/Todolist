import React, {ChangeEvent, useCallback} from "react";
import s from './Todolist.module.css'
import {Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch} from "react-redux";
import { TaskStatuses, TaskType } from "../../../api/todolists-api";
import { EditableSpan } from "../../../components/editableSpan/EditableSpan";
 
type TaskPropsType = {
    todolistId: string
    task: TaskType
    changeTaskStatus: (todolistId: string, id: string, status: TaskStatuses) => void
    changeTaskTitle: (todolistId: string, id: string, newTitle: string) => void
    removeTask: (todolistId: string, id: string) => void
}

export const Task = React.memo((props: TaskPropsType) => {
    
        const onClickHandler = useCallback(() => props.removeTask(props.todolistId, props.task.id)
            , [props.todolistId, props.task.id])
    
        const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
            let newIsDaneValue = e.currentTarget.checked
            props.changeTaskStatus(
                props.todolistId, props.task.id, newIsDaneValue ? TaskStatuses.Completed : TaskStatuses.New
            )
        }, [props.todolistId, props.task.id])
    
        const changeTitle = useCallback((title: string) => {
            props.changeTaskTitle(props.todolistId, props.task.id, title)
}, [props.todolistId, props.task.id])

        return <li key={props.task.id} className={props.task.status === TaskStatuses.Completed ? s.is_done : ""}
                   style={{paddingLeft: "0", listStyleType: "none", margin: "0"}}>
            <Checkbox
                checked={props.task.status === TaskStatuses.Completed}
                onChange={onChangeHandler}
                size="small"
                style={props.task.status === TaskStatuses.Completed ? {opacity: 0.9} : {opacity: 1}}
                color='secondary'
            />
            <EditableSpan changeTitle={changeTitle} title={props.task.title}/>
            <IconButton className={s.but_del} aria-label="delete" size="small" color='default'
                        onClick={onClickHandler}>
                <Delete/>
            </IconButton>
        </li>


} )