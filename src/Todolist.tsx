import React from 'react';
import {TasksArr} from "./App";

type TodoListPropsType = {
    title: string;
    taskList: TasksArr;
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

    return (
        <div className="todoList">
            <h3>{props.title}</h3>
            <div>
                <input type="text"/>
                <button>Add</button>
            </div>
            <ul>
                {taskArr}

                {/*<li>*/}
                {/*    <input type="checkbox" checked={true}/>*/}
                {/*    <span>HTML</span>*/}
                {/*</li>*/}
                {/*<li>*/}
                {/*    <input type="checkbox" checked={true}/>*/}
                {/*    <span>CSS</span>*/}
                {/*</li>*/}
                {/*<li>*/}
                {/*    <input type="checkbox" checked={true}/>*/}
                {/*    <span>JS</span>*/}
                {/*</li>*/}
                {/*<li>*/}
                {/*    <input type="checkbox"/>*/}
                {/*    <span>TS</span>*/}
                {/*</li>*/}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
}



