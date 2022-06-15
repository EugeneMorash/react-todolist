import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksType = {
    [todolistID: string]: Array<TaskType>
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}


function App() {
    // BLL
    const todolistID1 = v1();
    const todolistID2 = v1();
    const [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])
    const [tasks, setTasks] = useState<TasksType>({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: true},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "Chocolate", isDone: true},
            {id: v1(), title: "Fresh Water", isDone: false},
            {id: v1(), title: "Candy Cane", isDone: true},
            {id: v1(), title: "Apple Juice", isDone: true},
            {id: v1(), title: "Milk", isDone: false},
        ]
    });

    //

    function deleteTodolist(todolistID: string) {
        setTodolists(todolists.filter((tl) => tl.id !== todolistID))
        delete tasks[todolistID]
    }

    function changeFilter(todolistID: string, value: FilterValuesType) {
        setTodolists(todolists.map((tl) => {
            return tl.id === todolistID ? {...tl, filter: value} : tl
        }))
    }

    function removeTask(todolistID: string, id: string) {
        setTasks({
            ...tasks,
            [todolistID]: tasks[todolistID].filter(task => task.id !== id)
        })
    }

    function addTask(todolistID: string, title: string) {
        let task = {id: v1(), title, isDone: false};
        // let newTasks = [task, ...tasks];
        // setTasks(newTasks);
        setTasks({
            ...tasks,
            [todolistID]: [task, ...tasks[todolistID]]
        })
    }

    function changeStatus(todolistID: string, taskId: string, isDone: boolean) {
        setTasks({
            ...tasks,
            [todolistID]: tasks[todolistID].map(task => (
                taskId === task.id ? {...task, isDone} : task
            ))
        })
    }


    const todolistArray = todolists.map((tl) => {

        let tasksForTodolist = tasks[tl.id];
        if (tl.filter === "active") {
            tasksForTodolist = tasks[tl.id].filter(t => !t.isDone);
        }
        if (tl.filter === "completed") {
            tasksForTodolist = tasks[tl.id].filter(t => t.isDone);
        }

        return (
            <Todolist key={tl.id}
                      todolistID={tl.id}
                      title={tl.title}
                      filter={tl.filter}
                      tasks={tasksForTodolist}

                      removeTask={removeTask}
                      addTask={addTask}
                      changeTaskStatus={changeStatus}

                      deleteTodolist={deleteTodolist}
                      changeFilter={changeFilter}
            />
        )
    })

    function addTodolist(title: string) {
        const newTodolistID = v1()
        const newTodolist: TodolistType = {
            id: newTodolistID,
            title,
            filter: 'all'
        }

        setTodolists([...todolists, newTodolist])
        setTasks({...tasks, [newTodolistID]: []})
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {todolistArray.length ? todolistArray : 'Create your todolist'}
        </div>
    );
}

export default App;


// CREATE - [newObj, ...state]
// READ - map()
// UPDATE - map()
// DELETE - filter()

// Another:
// filter - filter
// sort - sort
// sum - reduce
