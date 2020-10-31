import React from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";

function App() {

    let tasks1: Array<TaskType> = [
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "React", isDone: false}
    ]
    let tasks2: Array<TaskType> = [
        {id: 1, title: "Terminator", isDone: true},
        {id: 2, title: "XxX", isDone: true},
        {id: 3, title: "Lord of the rings", isDone: true}
    ]


    return (
        <div className="App">
            <header className="App-header">
                <div className="Todo"><Todolist title="What to learn" tasks={tasks1}/></div>
                <div className="Todo"><Todolist title="Movies" tasks={tasks2}/></div>
            </header>
        </div>
    );
}

export default App;