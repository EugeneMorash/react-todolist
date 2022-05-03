import React from 'react';

type TodoListPropsType = {
    title: string;
}

export function TodoList(props: TodoListPropsType) {
    return (
        <div className="todoList">
            <h3>{props.title}</h3>
            <div>
                <input type="text"/>
                <button>Add</button>
            </div>
            <ul>
                <li>
                    <input type="checkbox" checked={true}/>
                    <span>HTML</span>
                </li>
                <li>
                    <input type="checkbox" checked={true}/>
                    <span>CSS</span>
                </li>
                <li>
                    <input type="checkbox" checked={true}/>
                    <span>JS</span>
                </li>
                <li>
                    <input type="checkbox"/>
                    <span>TS</span>
                </li>
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
}



