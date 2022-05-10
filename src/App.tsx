import React, {useState} from 'react';
import {TodoList} from "./Todolist";

export type TasksArrType = Array<LangType>;
export type LangType = {
    id: number
    title: string
    isDone: boolean
}

const tasks: TasksArrType = [
    {id: 100, title: "HTML", isDone: true},
    {id: 101, title: "CSS", isDone: true},
    {id: 102, title: "JS", isDone: true},
    {id: 103, title: "TS", isDone: false},
    {id: 104, title: "React", isDone: false},
    {id: 105, title: "Redux", isDone: false}
]



function App() {
    const [filter, setFilter] = useState('all');

    let taskList: TasksArrType = tasks;

    if (filter === "active") {
        taskList = tasks.filter(t => !t.isDone);
    }
    if (filter === "completed") {
        taskList = tasks.filter(t => t.isDone);
    }


    return (
        <div>
            <TodoList title={"Junior"} taskList={taskList}  setFilter={setFilter}/>
            {/*<TodoList title={"Cook"}/>*/}
        </div>
    );
}




export default App;
