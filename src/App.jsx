import { useState, useEffect } from 'react'
import './App.css'
import { PriorityTitle } from './Title';

import add from "./image/add.svg";
import del from "./image/delete.svg"

const PRIORITY = {
    HIGH: "high",
    LOW: "low",
}

const TASKS_HIGH = [];
const TASKS_LOW = [];

function App() {
    return (
        <div className="todo__wrapper">
            <PriorityBlock priority={PRIORITY.HIGH} />
            <PriorityBlock priority={PRIORITY.LOW} />
        </div>
    )
}

function PriorityBlock(props) {
    const [taskListHigh, setTaskListHigh] = useState(TASKS_HIGH);
    const [taskListLow, setTaskListLow] = useState(TASKS_LOW);

    const priority = props.priority;

    function handleTaskListHigh(newTaskText) {
        setTaskListHigh([...taskListHigh, newTaskText]);
    }    

    function handleTaskListLow(newTaskText) {
        setTaskListLow([...taskListLow, newTaskText]);
    }

    let array;

    if (priority === "high") { array = taskListHigh }
    else { array = taskListLow }

    return (
        <div className="todo__priority-block">
            <PriorityTitle priority={priority} />
            <AddPanel 
                priority={priority} 
                onTaskListHigh={handleTaskListHigh}
                onTaskListLow={handleTaskListLow}
            />
            <TasksList array={array}/>
        </div>
    )
}

function AddPanel(props) {
    const priority = props.priority;
    
    function handleSubmit(event) {
        event.preventDefault();

        const newTaskText = event.target[0].value;

        if (priority === "high") {
            return props.onTaskListHigh(newTaskText);
        }
        return props.onTaskListLow(newTaskText);
        
    }

    return (
        <form className="todo__add-block" onSubmit={handleSubmit}>
            <input 
                // value={}
                className="input-add" type="text" placeholder="Добавить важных дел" />
            <button className="btn-add"> <img src={add} alt="Иконка добавить задачу"/> </button>
        </form>
    )
}

function TasksList (props) {
    const array = props.array;
    console.log(array);

    return (
        <div className="tasksList">
            {array.map (taskText => {
                <TaskRow taskText = {taskText} />;
            })}
        </div>
    )
} 

function TaskRow(props) {
    console.log(props.text)
    const taskText = props.taskText;

    return (
        <div className="todo__task">
            <label> 
                <input className="input-done" type="checkbox"/> 
                <span className="cursor"></span>
            </label>
            <span className="task-text" > {taskText} </span>
            <button className="btn-delete"> <img src={del} alt="-"/> </button>
        </div>
    )
}

export default App;