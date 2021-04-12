import React, {ChangeEvent} from "react";
import s from './Todolist.module.css'
import {EditableSpan} from "./EditableSpan";
import {Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./AppWithRedux";
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTitleTaskStatusAC, removeTaskAC} from "./state/tasks-reducer";

export type TaskPropsType = {
    todolistId: string
    task: TaskType
}

export const Task = React.memo((props: TaskPropsType) => {

  const task = props.task
    const dispatch = useDispatch()

        const onClickHandler = () => dispatch(removeTaskAC(task.id, props.todolistId))
        const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
            dispatch(changeTaskStatusAC(task.id, e.currentTarget.checked, props.todolistId))
        }
        const changeTitle = (title: string) => dispatch(changeTitleTaskStatusAC(task.id, title, props.todolistId))

        return <li key={task.id} className={task.isDone ? s.is_done : ""}
                   style={{paddingLeft: "0", listStyleType: "none", margin: "0"}}>
            <Checkbox
                checked={task.isDone}
                onChange={onChangeStatus}
                size="small"
                style={task.isDone ? {opacity: 0.9} : {opacity: 1}}
                color='secondary'
            />
            <EditableSpan changeTitle={changeTitle} title={task.title}/>
            <IconButton className={s.but_del} aria-label="delete" size="small" color='default'
                        onClick={onClickHandler}>
                <Delete/>
            </IconButton>
        </li>


} )