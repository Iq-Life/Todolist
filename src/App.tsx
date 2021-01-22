import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValueType = "all" | "active" | "completed"

export type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}

function App() {

    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: false},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Redax", isDone: false}
    ])

    const [todoLists, setTodoLists] = useState<Array<TodolistType>>([
        {id: v1(), title: "Film", filter: "all"},
        {id: v1(), title: "Music", filter: "all"}
    ])


    function removeTasks(id: string) {
        let filteredTasks = tasks.filter(t => (t.id !== id))
        setTasks(filteredTasks)
    }

    function changeFilter(value: FilterValueType, todoListId : string) {
        const todoList= todoLists.find(tl => tl.id === todoListId)
        if(todoList){
            todoList.filter=value
            setTodoLists([...todoLists])
        }
    }

    function addTasks(title: string) {
        let task = {id: v1(), title: title, isDone: false};
        let newTasks = [task, ...tasks];
        setTasks(newTasks);
    }

    function changeStatusTask(id: string, isDone: boolean) {
        let task = tasks.find(t => t.id === id);
        if (task) {
            task.isDone = isDone;
            setTasks([...tasks])
        }
    }


    return (
        <div className="App">
            <header className="App-header">
                <div>
                    {todoLists.map(tl => {
                        let tasksForTodolist = tasks;
                        if (tl.filter === "completed") {
                            tasksForTodolist = tasks.filter(t => t.isDone)
                        }
                        if (tl.filter === "active") {
                            tasksForTodolist = tasks.filter(t => !t.isDone)
                        }
                                return <Todolist
                                    id={tl.id}
                                    key={tl.id}
                                    title={tl.title}
                                    addTask={addTasks}
                                    colorFilter={tl.filter}
                                    tasks={tasksForTodolist}
                                    removeTasks={removeTasks}
                                    changeFilter={changeFilter}
                                    changeStatus={changeStatusTask}/>
                        })}
                </div>
            </header>
        </div>
    );
}

export default App;