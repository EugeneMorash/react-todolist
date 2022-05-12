import React from 'react';
import {TodoList} from "./Todolist";

export type TasksArrType = Array<LangType>;
export type LangType = {
    id: number
    title: string
    isDone: boolean
}

export const tasks: TasksArrType = [
    {id: 100, title: "HTML", isDone: true},
    {id: 101, title: "CSS", isDone: true},
    {id: 102, title: "JS", isDone: true},
    {id: 103, title: "TS", isDone: false},
    {id: 104, title: "React", isDone: false},
    {id: 105, title: "Redux", isDone: false}
]



function App() {

    return (
        <div>
            <TodoList title={"Junior"} tasks={tasks}/>
        </div>
    );
}



// Перенести useState и процесс фильтрации в компоненту todolist.  Сделать коммит.
// Затем снова вернуть useState и процесс фильтрации в App (Для понимания и закрепления!),  не возвращаясь к предыдущему коммиту


export default App;
