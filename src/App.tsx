import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

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

export type TasksStateType ={
    [key: string] : Array<TaskType>
}

function App() {

    const todoListId1= v1()
    const todoListId2= v1()

    const [todoLists, setTodoLists] = useState<Array<TodolistType>>([
        {id: todoListId1, title: "Film", filter: "all"},
        {id: todoListId2, title: "Music", filter: "all"}
    ])

    const [tasks, setTasks] = useState <TasksStateType> ({
        [todoListId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: false},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Redax", isDone: false}
        ],
        [todoListId2] : [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Fish", isDone: false},
            {id: v1(), title: "Beer", isDone: false},
            {id: v1(), title: "Juce", isDone: false}
        ]
    })

    function addTasks(title: string, todoListId : string) {
        const newTasks : TaskType = {id: v1(), title: title, isDone: false}
        const todoList = tasks[todoListId]
        tasks[todoListId] = [newTasks, ...todoList]
        setTasks({...tasks})
    }

    function removeTasks(taskId: string, todoListId : string) {
        const todoList = tasks[todoListId]
        tasks[todoListId] = todoList.filter(t => t.id !== taskId)
        setTasks({...tasks})
    }


    function changeTaskStatus(taskId: string, isDone: boolean, todoListId : string) {
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

    function changeFilter(value: FilterValueType, todoListId : string) {
        const todoList= todoLists.find(tl => tl.id === todoListId)
        if(todoList){
            todoList.filter=value
            setTodoLists([...todoLists])
        }
    }

    function removeTodoList ( todoListId: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListId))
        delete tasks[todoListId]
        /*setTasks({...tasks})*/
    }

    return (
        <div className="App">
            <header className="App-header">
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
                                    changeStatus={changeTaskStatus}/>
                        })}
                </div>
            </header>
        </div>
    );
}

export default App;