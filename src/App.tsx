import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValueType = "all"|"active"|"completed"

function App() {

    let [tasks,setTasks]= useState <Array<TaskType>> ([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: false},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Redax", isDone: false}
    ])
    let [filter, setFilter]= useState <FilterValueType>("all")

    function removeTasks(id: string) {
        let filteredTasks = tasks.filter(t => (t.id !== id))
            setTasks(filteredTasks)
        }

    function changeFilter (value:FilterValueType){
        setFilter(value)
    }

    function addTasks (title:string) {
        let task = {id: v1(), title: title, isDone: false};
        let newTasks = [task, ...tasks];
        setTasks(newTasks);
    }

    let tasksForTodolist = tasks;
    if (filter === "completed") { tasksForTodolist = tasks.filter( t => t.isDone ) }
    if (filter === "active") { tasksForTodolist = tasks.filter( t => !t.isDone ) }

    return (
        <div className="App">
            <header className="App-header">
                <div>
                    <Todolist
                        addTask={addTasks}
                        title="Way of the samurai"
                        tasks={tasksForTodolist}
                        removeTasks={removeTasks}
                        changeFilter={changeFilter}
                    />
                </div>
            </header>
        </div>
    );
}

export default App;