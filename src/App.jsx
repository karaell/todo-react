import { useState, useEffect } from 'react'
import './App.css'
import { PriorityTitle } from './Title';

import add from "./image/add.svg";
import del from "./image/delete.svg"

function App() {
    return (
        <div className="todo__wrapper">
            <PriorityBlock priority="high"/>
            <PriorityBlock priority="low"/>
        </div>
    )
}

function PriorityBlock(props) {
    const priority = props.priority;

    return (
        <div className="todo__priority-block" id={priority}>
            <PriorityTitle priority={priority} />
            <AddPanel />
            <TasksBlock />
        </div>
    )
}

function AddPanel() {
    const [text, setText] = useState('');
    
    function handleSubmit(event) {
        event.preventDefault();
        setText(event.target[0].value);
    }

    useEffect(()=> {
        console.log(text);
        <TasksBlock text={text} />;
    })

    return (
        <form className="todo__add-block" onSubmit={handleSubmit}>
            <input className="input-add" type="text" placeholder="Добавить важных дел"/>
            <button className="btn-add"> <img src={add} alt="Иконка добавить задачу"/> </button>
        </form>
    )
}

function TasksBlock (props) {
    const text = props.text;
    console.log(text)

    return (
        <TaskRow text = {text} />
    )
}

function TaskRow(props) {
    const taskText = props.text;

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
