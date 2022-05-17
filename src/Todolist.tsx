import React from 'react';
import {FilterType, TasksArrType} from "./App";


export type TodoListPropsType = {
    title: string
    taskList: TasksArrType
    todoListHandler: (filter: FilterType) => void
    deleteTask: (id: number) => void;
}


export function TodoList(props: TodoListPropsType) {



    const taskArr = props.taskList.map(task => {
        const deleteClickHandler = (id: number) => {
            props.deleteTask(id)
        }

        return (
            <li key={task.id}>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={() => {deleteClickHandler(task.id)}} type="button">Delete</button>
            </li>
        )
    })

    const onClickAllHandler = () => {
        props.todoListHandler("all");
    }
    const onClickActiveHandler = () => {
        props.todoListHandler("active");
    }
    const onClickCompletedHandler = () => {
        props.todoListHandler("completed");
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
                <button onClick={onClickAllHandler} type="button">All</button>
                <button onClick={onClickActiveHandler} type="button">Active</button>
                <button onClick={onClickCompletedHandler} type="button">Completed</button>
            </div>
        </div>
    );
}



