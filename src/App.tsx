import React, {useState} from 'react';
import {TodoList} from "./Todolist";

export type TasksArrType = Array<LangType>;
export type LangType = {
    id: number
    title: string
    isDone: boolean
}
export type FilterType = 'active' | 'completed' | 'all'

const tasksState: TasksArrType = [
    {id: 100, title: "HTML", isDone: true},
    {id: 101, title: "CSS", isDone: true},
    {id: 102, title: "JS", isDone: true},
    {id: 103, title: "TS", isDone: false},
    {id: 104, title: "React", isDone: false},
    {id: 105, title: "Redux", isDone: false}
]


function App() {

    const [filter, setFilter] = useState('all');

    const [tasks, setTasks] = useState(tasksState);

    const deleteTask = (id: number) => {
        setTasks(tasks.filter((t) => t.id !== id))
    }





    let taskList = tasks;
    if (filter === "active") {
        taskList = tasks.filter(t => !t.isDone);
    }
    if (filter === "completed") {
        taskList = tasks.filter(t => t.isDone);
    }

    const todoListHandler = (filterName: FilterType) => {
        setFilter(filterName);
    }

    return (
        <div>
            <TodoList title={"Junior"} taskList={taskList} todoListHandler={todoListHandler}  deleteTask={deleteTask}/>
        </div>

    );
}


// Перенести useState и процесс фильтрации в компоненту todolist.  Сделать коммит.
// Затем снова вернуть useState и процесс фильтрации в App (Для понимания и закрепления!),  не возвращаясь к предыдущему коммиту


export default App;
