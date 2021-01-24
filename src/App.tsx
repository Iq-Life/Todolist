import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

export type FilterValueType = "all" | "active" | "completed"

export type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    const todoListId1 = v1()
    const todoListId2 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodolistType>>([
        {id: todoListId1, title: "Film", filter: "all"},
        {id: todoListId2, title: "Music", filter: "all"}
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todoListId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: false},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Redax", isDone: false}
        ],
        [todoListId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Fish", isDone: false},
            {id: v1(), title: "Beer", isDone: false},
            {id: v1(), title: "Juice", isDone: false}
        ]
    })

    function addTasks(title: string, todoListId: string) {
        const newTasks: TaskType = {id: v1(), title: title, isDone: false}
        const todoList = tasks[todoListId]
        tasks[todoListId] = [newTasks, ...todoList]
        setTasks({...tasks})
    }
    function removeTasks(taskId: string, todoListId: string) {
        const todoList = tasks[todoListId]
        tasks[todoListId] = todoList.filter(t => t.id !== taskId)
        setTasks({...tasks})
    }
    function changeTaskStatus(taskId: string, isDone: boolean, todoListId: string) {
        const todoList = tasks[todoListId]
        /*const newTodoList = todoList.map(task => {
                if (task.id === taskId) {
                    return { ...task, idDone : isDone}
                }
                return task
        })
        tasks[todoListId] = newTodoList
        setTasks({...tasks})*/
        const task = todoList.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }
    }
    function changeTaskTitle(taskId: string, title: string, todoListId: string) {
        const todoList = tasks[todoListId]
        const task = todoList.find(t => t.id === taskId)
        if (task) {
            task.title = title
            setTasks({...tasks})
        }
    }
    function changeTodoListTitle (title: string, todoListId: string){
        const todoList = todoLists.find(tl => tl.id === todoListId)
        if(todoList){
            todoList.title = title
            setTodoLists([...todoLists])
        }
    }
    function changeFilter(value: FilterValueType, todoListId: string) {
        const todoList = todoLists.find(tl => tl.id === todoListId)
        if (todoList) {
            todoList.filter = value
            setTodoLists([...todoLists])
        }
    }
    function removeTodoList(todoListId: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListId))
        delete tasks[todoListId]
    }
    function addTodoList(title: string) {
        let newTodolistId = v1()
        let newTodoList: TodolistType = {id: newTodolistId, title: title, filter: "all"}
        setTodoLists([newTodoList, ...todoLists])
        setTasks({...tasks, [newTodolistId]: []})
    }

    return (
        <div className="App">
            <header className="App-header">
                <AddItemForm addItem={addTodoList}/>
                <div>
                    {todoLists.map(tl => {
                        let tasksForTodolist = tasks[tl.id];
                        if (tl.filter === "completed") {
                            tasksForTodolist = tasks[tl.id].filter(task => task.isDone)
                        }
                        if (tl.filter === "active") {
                            tasksForTodolist = tasks[tl.id].filter(task => !task.isDone)
                        }
                        return <Todolist
                            key={tl.id}
                            id={tl.id}
                            title={tl.title}
                            colorFilter={tl.filter}
                            tasks={tasksForTodolist}
                            addTask={addTasks}
                            removeTasks={removeTasks}
                            changeFilter={changeFilter}
                            removeTodoList={removeTodoList}
                            changeTaskTitle={changeTaskTitle}
                            changeStatus={changeTaskStatus}
                            changeTodoListTitle={changeTodoListTitle}
                        />
                    })}
                </div>
            </header>
        </div>
    );
}

export default App;