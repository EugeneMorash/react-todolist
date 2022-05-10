import React from 'react';
import {TasksArrType} from "./App";


type TodoListPropsType = {
    title: string
    taskList: TasksArrType
    setFilter: (filter: string) => void
}

export function TodoList(props: TodoListPropsType) {
    const taskArr = props.taskList.map(task => {
        return (
            <li key={task.id}>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
            </li>
        )
    })


    const onCLickHandler = (filter: string) => {
        props.setFilter(filter);
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



