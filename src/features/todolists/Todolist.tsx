import React, {useCallback, useEffect} from "react";
import {Button} from "@material-ui/core";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {AppRootStateType} from "../../app/store";
import {useDispatch, useSelector } from "react-redux";
import { TaskStatuses, TaskType } from "../../api/todolists-api";
import { fetchTasksTC } from "./tasks/tasks-reducer";
import { FilterValueType, TodolistDomainType } from "./todolist-reducer";
import { EditableSpan } from "../../components/editableSpan/EditableSpan";
import { AddItemForm } from "../../components/addItemForm/AddItemForm";
import { Task } from "./tasks/Task";


export type PropsType = {
    todolist: TodolistDomainType
    tasks: Array<TaskType>
    removeTask: (todolistId: string, id: string) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, id: string, status: TaskStatuses) => void
    changeTaskTitle: (todolistId: string, id: string, newTitle: string) => void
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
    changeFilter: (todolistId: string, value: FilterValueType) => void
    demo?: boolean
}

export const Todolist = React.memo(({demo = false, ...props}: PropsType) => {

    const dispatch = useDispatch()
    useEffect(() => {
        if (demo){
            return
        }
        dispatch(fetchTasksTC(props.todolist.id))
    }, [])

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.todolist.id)
    }, [props.addTask, props.todolist.id])
    const removeTodolist = useCallback(() => {
        props.removeTodolist(props.todolist.id)
    }, [props.todolist.id])
    const changeTodolistTitle = useCallback((title: string) =>
        props.changeTodolistTitle(props.todolist.id, title),[props])
    
    let tasksForTodolist = props.tasks
    if (props.todolist.filter === 'active') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (props.todolist.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    const changeFilterAll = useCallback(() => 
        props.changeFilter(props.todolist.id, "all"),[props.todolist.id, props.changeFilter])
    const changeFilterActive = useCallback(() => 
        props.changeFilter(props.todolist.id, "active"),[props.todolist.id, props.changeFilter])
    const changeFilterCompleted = useCallback(() => 
        props.changeFilter(props.todolist.id, "completed"),[props.todolist.id, props.changeFilter])

    return <div>
        <div style={{display: "flex", justifyContent: "flex-end"}}>
            <Button
                variant="outlined"
                color="secondary"
                startIcon={<DeleteForeverIcon/>}
                onClick={removeTodolist}
                disabled={props.todolist.entityStatus === 'loading'}
            >
            </Button>
        </div>

        <h2 style={{
            display: "flex", justifyContent: "center", marginTop: "0",
            fontFamily: "Bradley Hand, cursive", marginBottom: "5px"
        }}>
            <EditableSpan title={props.todolist.title} changeTitle={changeTodolistTitle}/>
        </h2>

        <AddItemForm addItem={addTask} disabled={props.todolist.entityStatus === 'loading'}/>
        <ul style={{fontFamily: "Bradley Hand, cursive", paddingLeft: "0", marginBottom: "0"}}>
            {
                tasksForTodolist.map(t => <Task key={t.id} task={t} todolistId={props.todolist.id} removeTask={props.removeTask}
                                                changeTaskTitle={props.changeTaskTitle} changeTaskStatus={props.changeTaskStatus}/>)
            }
            <div style={{display: "flex", justifyContent: "center", marginTop: "10px"}}>
                <Button variant={props.todolist.filter === "all" ? "contained" : "text"}
                        onClick={changeFilterAll}>All
                </Button>
                <Button variant={props.todolist.filter === "active" ? "contained" : "text"}
                        color={"primary"}
                        onClick={changeFilterActive}>Active
                </Button>
                <Button variant={props.todolist.filter === "completed" ? "contained" : "text"}
                        color={"secondary"}
                        onClick={changeFilterCompleted}>Completed
                </Button>
            </div>
        </ul>
    </div>
} )