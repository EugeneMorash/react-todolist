import React, {useState} from 'react';
import {TodoList} from "./Todolist";
import {v1} from "uuid";

export type TasksArrType = Array<LangType>;
export type LangType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterType = 'active' | 'completed' | 'all'

const tasksState: TasksArrType = [
    {id: v1(), title: "HTML", isDone: true},
    {id: v1(), title: "CSS", isDone: true},
    {id: v1(), title: "JS", isDone: true},
    {id: v1(), title: "TS", isDone: false},
    {id: v1(), title: "React", isDone: false},
    {id: v1(), title: "Redux", isDone: false}
]


function App() {
    const [tasks, setTasks] = useState(tasksState);
    const deleteTask = (id: string) => {
        setTasks(tasks.filter((t) => t.id !== id))
    }

    const addTask = (title: string) => {
        const newTask = {id: v1(), title: title, isDone: false}
        setTasks([newTask, ...tasks])
    }



    const [filter, setFilter] = useState('all');
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
            <TodoList title={"Junior"}
                      taskList={taskList}
                      todoListHandler={todoListHandler}
                      deleteTask={deleteTask}
                      addTask={addTask}
            />
        </div>
    );
}


// Перенести useState и процесс фильтрации в компоненту todolist.  Сделать коммит.
// Затем снова вернуть useState и процесс фильтрации в App (Для понимания и закрепления!),  не возвращаясь к предыдущему коммиту


export default App;
