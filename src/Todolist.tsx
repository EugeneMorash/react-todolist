import React, {useState} from 'react';
import {TasksArrType} from "./App";


export type TodoListPropsType = {
    title: string
    tasks: TasksArrType
    // taskList: TasksArrType
    // setFilter: (filter: string) => void
}

export function TodoList(props: TodoListPropsType) {

    const [filter, setFilter] = useState('all');

    // const setFilter = (newFIlter) => {
    //     filter = newFIlter
    //     rerender()
    // }

    let taskList = props.tasks;

    if (filter === "active") {
        taskList =  props.tasks.filter(t => !t.isDone);
    }
    if (filter === "completed") {
        taskList =  props.tasks.filter(t => t.isDone);
    }

    const taskArr = taskList.map(task => {
        return (
            <li key={task.id}>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
            </li>
        )
    })

    const onCLickHandler = (filter: string) => {
        setFilter(filter);
    }

    return (
        <div className="todoList">
            <h3>{props.title}</h3>
            <div>
                <input type="text"/>
                <button>Add</button>
            </div>
            <ul>
                {taskArr}
            </ul>
            <div>
                {/*<button onClick={ () => { onCLickHandler() }} type="button">All</button>*/}
                {/*<button onClick={ onCLickHandler }} type="button">All</button>*/}

                <button onClick={ () => {onCLickHandler('all')} } type="button">All</button>
                <button onClick={ () => {onCLickHandler('active')} } type="button">Active</button>
                <button onClick={ () => {onCLickHandler('completed')} } type="button">Completed</button>
            </div>
        </div>
    );
}



