import React, {useCallback} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button} from "@material-ui/core";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {AppRootStateType} from "./state/store";
import {addTaskAC, TaskType} from "./state/tasks-reducer";
import {Task} from "./Task";
import { FilterValueType } from "./state/todolist-reducer";
import {useDispatch, useSelector } from "react-redux";


export type PropsType = {
    id: string
    title: string
    filter: FilterValueType
    removeTodolist: (todolistId: string) => void
    changeFilter: (todolistId: string, value: FilterValueType) => void
    changeTodolistTitle: (title: string, todolistId: string) => void
}

export const Todolist = React.memo((props: PropsType) => {
    
    const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.id])
    const dispatch = useDispatch()
    
    const removeTodolist = useCallback(() => props.removeTodolist(props.id),[props])
    const addTask = useCallback((title: string) => dispatch(addTaskAC(title, props.id)),[dispatch, props])
    const changeTodolistTitle = useCallback((title: string) => props.changeTodolistTitle(props.id, title),[props])

    const changeFilterAll = useCallback(() => props.changeFilter(props.id, "all"),[props])
    const changeFilterActive = useCallback(() => props.changeFilter(props.id, "active"),[props])
    const changeFilterCompleted = useCallback(() => props.changeFilter(props.id, "completed"),[props])
 
    let allTodolistTasks = tasks
    let tasksForTodolist = allTodolistTasks
    if (props.filter === "completed") {
        tasksForTodolist = allTodolistTasks.filter(task => task.isDone)
    }
    if (props.filter === "active") {
        tasksForTodolist = allTodolistTasks.filter(task => !task.isDone)
    }
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
                tasksForTodolist.map(t => <Task task={t} todolistId={props.id} />)
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