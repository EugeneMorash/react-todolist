import React from 'react';
import './App.css';
import {Todolist} from './Todolist';

import {AddItemForm} from "./AddItemForm";
import {AppBar, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    TodolistType
} from "./store/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TasksType} from "./store/tasks-reducers";
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from "./store/store";

export type FilterValuesType = "all" | "active" | "completed";


function App() {

    // const [todolists, dispatchTodolists] = useReducer(todolistReducer, [])
    // const [tasks, dispatchTasks] = useReducer(tasksReducer, {});

    // <Тип корневого стейта всего приложения (тот самый тип, который вернул корневой редусер), Тип того стейта, который мы хотим (нам нужен)>
    const todolists = useSelector<AppRootStateType, TodolistType[]>(appRootState => appRootState.todolists)
    // use принимает callback, который принимает на вход state всего приложения, и возвращает тот стейт, который мы хотим.
    const tasks = useSelector<AppRootStateType, TasksType>(appRootState => appRootState.tasks)


    const dispatch = useDispatch() // Приложение вызовет его 1 раз



    //* Tasks

    function changeTaskTitle(todolistID: string, taskID: string, title: string) {
        // dispatchTasks(changeTaskTitleAC(todolistID, taskID, title))
        dispatch(changeTaskTitleAC(todolistID, taskID, title))
    }

    function removeTask(todolistID: string, taskID: string) {
        // dispatchTasks(removeTaskAC(todolistID, taskID))
        dispatch(removeTaskAC(todolistID, taskID))
    }

    function addTask(todolistID: string, title: string) {
        // dispatchTasks(addTaskAC(todolistID, title))
        dispatch(addTaskAC(todolistID, title))
    }

    function changeStatus(todolistID: string, taskID: string, isDone: boolean) {
        // dispatchTasks(changeTaskStatusAC(todolistID, taskID, isDone))
        dispatch(changeTaskStatusAC(todolistID, taskID, isDone))
    }


    //* Todolist

    function deleteTodolist(todolistID: string) {
        // const action = removeTodolistAC(todolistID)
        dispatch(removeTodolistAC(todolistID))
        // dispatchTodolists(action)
        // dispatchTasks(action)

    }

    function addTodolist(title: string) {
        // const action = addTodolistAC(title)
        // dispatchTodolists(action)
        // dispatchTasks(action)
        dispatch(addTodolistAC(title))
    }

    function changeFilter(todolistID: string, filter: FilterValuesType) {
        // dispatchTodolists(changeTodolistFilterAC(todolistID, filter))
        dispatch(changeTodolistFilterAC(todolistID, filter))
    }

    function changeTodolistTitle(todolistID: string, title: string) {
        //dispatchTodolists(changeTodolistTitleAC(todolistID, title))
        dispatch(changeTodolistTitleAC(todolistID, title))
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
            <Grid item key={tl.id}>
                <Paper elevation={3} style={{padding: '25px'}}>
                    <Todolist
                        todolistID={tl.id}
                        title={tl.title}
                        filter={tl.filter}
                        tasks={tasksForTodolist}

                        removeTask={removeTask}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        changeTaskTitle={changeTaskTitle}

                        deleteTodolist={deleteTodolist}
                        changeTodolistTitle={changeTodolistTitle}
                        changeFilter={changeFilter}
                    />
                </Paper>
            </Grid>

        )
    })


    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        Our Trello
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <AddItemForm addItem={addTodolist}/>
                <Grid container spacing={3} justifyContent="center">

                    {todolistArray.length ? todolistArray : 'Create your todolist'}


                </Grid>
            </Container>

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


// delete object[key]
