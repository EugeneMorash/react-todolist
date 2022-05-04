import React from 'react';
import {TodoList} from "./Todolist";

export type TasksArr = Array<LangType>;
export type LangType = {
    id: number
    title: string
    isDone: boolean
}

const tasks: TasksArr = [
    {id: 100, title: "HTML", isDone: true},
    {id: 101, title: "CSS", isDone: true},
    {id: 102, title: "JS", isDone: true},
    {id: 103, title: "TS", isDone: false},
    {id: 104, title: "React", isDone: false},
    {id: 105, title: "Redux", isDone: false},
]





function App() {


    return (
        <div>
            <TodoList title={"Junior"} taskList={tasks}/>
            {/*<TodoList title={"Cook"}/>*/}
        </div>
    );
}




export default App;
