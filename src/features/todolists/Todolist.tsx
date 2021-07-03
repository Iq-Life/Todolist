import React, {useCallback, useEffect} from "react";
import {Button} from "@material-ui/core";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {AppRootStateType} from "../../app/store";
import {useDispatch, useSelector } from "react-redux";
import { TaskStatuses, TaskType } from "../../api/todolists-api";
import { fetchTasksTC } from "./tasks/tasks-reducer";
import { FilterValueType } from "./todolist-reducer";
import { EditableSpan } from "../../components/editableSpan/EditableSpan";
import { AddItemForm } from "../../components/addItemForm/AddItemForm";
import { Task } from "./tasks/Task";


export type PropsType = {
    todolistId: string
    title: string
    filter: FilterValueType
    tasks: Array<TaskType>
    removeTask: (todolistId: string, id: string) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, id: string, status: TaskStatuses) => void
    changeTaskTitle: (todolistId: string, id: string, newTitle: string) => void
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
    changeFilter: (todolistId: string, value: FilterValueType) => void
}

export const Todolist = React.memo((props: PropsType) => {
    
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTasksTC(props.todolistId))
    }, [])

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.todolistId)
    }, [props.addTask, props.todolistId])
    const removeTodolist = useCallback(() => {
        props.removeTodolist(props.todolistId)
    }, [props.todolistId])
    const changeTodolistTitle = useCallback((title: string) =>
        props.changeTodolistTitle(props.todolistId, title),[props])
    
    let tasksForTodolist = props.tasks
    if (props.filter === 'active') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (props.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    const changeFilterAll = useCallback(() => 
        props.changeFilter(props.todolistId, "all"),[props.todolistId, props.changeFilter])
    const changeFilterActive = useCallback(() => 
        props.changeFilter(props.todolistId, "active"),[props.todolistId, props.changeFilter])
    const changeFilterCompleted = useCallback(() => 
        props.changeFilter(props.todolistId, "completed"),[props.todolistId, props.changeFilter])

    console.log('props.tasks ===> ',props.tasks)
    console.log('tasksForTodolist ===> ',tasksForTodolist)
    return <div>
        <div style={{display: "flex", justifyContent: "flex-end"}}>
            <Button
                variant="outlined"
                color="secondary"
                startIcon={<DeleteForeverIcon/>}
                onClick={removeTodolist}
            >
            </Button>
        </div>

        <h2 style={{
            display: "flex", justifyContent: "center", marginTop: "0",
            fontFamily: "Bradley Hand, cursive", marginBottom: "5px"
        }}>
            <EditableSpan title={props.title} changeTitle={changeTodolistTitle}/>
        </h2>

        <AddItemForm addItem={addTask}/>
        <ul style={{fontFamily: "Bradley Hand, cursive", paddingLeft: "0", marginBottom: "0"}}>
            {
                tasksForTodolist.map(t => <Task key={t.id} task={t} todolistId={props.todolistId} removeTask={props.removeTask}
                                                changeTaskTitle={props.changeTaskTitle} changeTaskStatus={props.changeTaskStatus}/>)
            }
            <div style={{display: "flex", justifyContent: "center", marginTop: "10px"}}>
                <Button variant={props.filter === "all" ? "contained" : "text"}
                        onClick={changeFilterAll}>All
                </Button>
                <Button variant={props.filter === "active" ? "contained" : "text"}
                        color={"primary"}
                        onClick={changeFilterActive}>Active
                </Button>
                <Button variant={props.filter === "completed" ? "contained" : "text"}
                        color={"secondary"}
                        onClick={changeFilterCompleted}>Completed
                </Button>
            </div>
        </ul>
    </div>
} )