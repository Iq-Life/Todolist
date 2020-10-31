import React from "react";

export type TaskType = {
    id:number
    title:string
    isDone:boolean
}

 export type PropsType ={
    title:string
     tasks: Array<TaskType>
}
export function Todolist (props:PropsType) {
    return (
        <div>
            <h3>{props.title}</h3>
            <input/>
            <button>add</button>
            <ul className="App-ul">
                <li>
                    <input type="checkbox" checked={props.tasks[0].isDone}/>  <span className="App-ul-text">{props.tasks[0].title}</span>  <button>[x]</button>
                </li>
                <li>
                    <input type="checkbox" checked={props.tasks[1].isDone}/>  <span className="App-ul-text">{props.tasks[1].title}</span>  <button>[x]</button>
                </li>
                <li>
                    <input type="checkbox" checked={props.tasks[2].isDone}/>  <span className="App-ul-text">{props.tasks[2].title}</span>  <button>[x]</button>
                </li>
            </ul>
            <button>all</button>
            <button>active</button>
            <button>completed</button>
        </div>
    )
}