import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";

export type FilterValueType = "all"|"active"|"completed"

function App() {

    let [tasks,setTasks]= useState <Array<TaskType>> ([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: false},
        {id: 3, title: "React", isDone: false},
        {id: 4, title: "Redax", isDone: false}
    ])
    let [filter, setFilter]= useState <FilterValueType>("all")

    function removeTasks(id: number) {
        let filteredTasks = tasks.filter(t => (t.id !== id))
            setTasks(filteredTasks)
        }
    /*function removeTasks(id: number) {
        let filteredTasks = tasks.filter((t) => {
            if (t.id !== id) {
                return true
            } else {
                return false
            }
            setTasks(filteredTasks)
        })
    }*/

    function changeFilter (value:FilterValueType){
        setFilter(value)
    }

    let tasksForTodolist = tasks;
    if (filter === "completed") {
        tasksForTodolist = tasks.filter( t => t.isDone === true )
    }
    if (filter === "active") {
        tasksForTodolist = tasks.filter( t => t.isDone === false )
    }

    return (
        <div className="App">
            <header className="App-header">
                <div>
                    <Todolist
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