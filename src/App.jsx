import { useState } from 'react';
import './App.css';
import { PriorityTitle } from './Title';

import add from './image/add.svg';
import del from './image/delete.svg';

const PRIORITY = {
    HIGH: 'high',
    LOW: 'low',
};

const TASKS = [];

let count = 1;

function App() {
    return (
        <div className="todo__wrapper">
            <PriorityBlock priority={PRIORITY.HIGH} />
            <PriorityBlock priority={PRIORITY.LOW} />
        </div>
    );
}

function PriorityBlock(props) {
    const [tasksList, setTasksList] = useState(TASKS)

    const priority = props.priority;

    function handleTasksList(newTaskText) {
        const newTask = {
            done: false,
            id: count,
            value: newTaskText,
        }
        setTasksList([...tasksList, newTask]);
        count++;
    }

    function handleArrayChange(tasks) {
        setTasksList(tasks);

        console.log(tasksList)
    }

    return (
        <div className="todo__priority-block">
            <PriorityTitle priority={priority} />
            <AddPanel 
                priority={priority} 
                onTasksList = {handleTasksList}
            />
            <TasksList 
                array={tasksList} 
                onChangeTasksList={handleArrayChange}
            />
        </div>
    );
}

function AddPanel(props) {
    const [inputValue, setInputValue] = useState('')


    function handleSubmit(event) {
        event.preventDefault();

        props.onTasksList(event.target[0].value);

        setInputValue('')
    }

    function onChange(event) {
        event.preventDefault();
        setInputValue(event.target.value)
    }

    return (
      <form className="todo__add-block" onSubmit={handleSubmit}>
          <input 
                value={inputValue}
                onChange = {onChange}
                className="input-add" type="text" placeholder="Добавить важных дел" />
          <button className="btn-add"> <img src={add} alt="Иконка добавить задачу"/> </button>
        </form>
    );
}

function TasksList(props) {
    const array = props.array;


    function handleDone(targetTaskId) {
        // создаем копию массива, чтобы не мутировать исходный
        const _array = array.concat();

        // найлдем нужную задачу
        const task = _array.find(task => task.id === targetTaskId);

        // меняем свойство
        task.done = task.done === true ? false : true ;

        props.onChangeTasksList(_array)
    }

    function handleClose(targetTask) {
        const newTasksArray = array.filter ( task => task.id !== targetTask.id)
        props.onChangeTasksList(newTasksArray);
    }

    return (
        <div className="tasksList">
            {array.map (task => (
                <TaskRow
                    key = {task.id}
                    task = {task} 
                    onDone = {handleDone}
                    onClose = {handleClose}
                />
            ))}
        </div>
    );
}

function TaskRow(props) {
    const task = props.task;

    const classes = ['todo__task'];

    if (task.done) {
        classes.push('done')
    }

    return (
      <div className={classes.join(' ')}>
          <label> 
              <input className="input-done" type="checkbox" onClick={ () => props.onDone (task.id) } /> 
              <span className="cursor"></span>
            </label>
          <span className="task-text" > {task.value} </span>
          <button className="btn-delete" onClick={ () => props.onClose (task) } > <img src={del} alt="-"/> </button>
        </div>
    );
}

export default App;