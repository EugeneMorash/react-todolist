import React from 'react';
import './App.css';
import {Todolist} from './Todolist';

import {AddItemForm} from "./AddItemForm";
import {AppBar, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {addTodolistAC, TodolistType} from "./store/todolist-reducer";
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from "./store/store";

export type FilterValuesType = "all" | "active" | "completed";


function App() {
    // const [todolists, dispatchTodolists] = useReducer(todolistReducer, [])
    // const [tasks, dispatchTasks] = useReducer(tasksReducer, {});

    // <Тип корневого стейта всего приложения (тот самый тип, который вернул корневой редусер), Тип того стейта, который мы хотим (нам нужен)>
    const todolists = useSelector<AppRootStateType, TodolistType[]>((appRootState) => appRootState.todolists)
    // Вытащить из контекста Provider store, в котором нам нужен метод dispatch
    const dispatch = useDispatch() // Приложение вызовет его 1 раз

    const addTodolist = (title: string) => {
        dispatch(addTodolistAC(title))
    };

    const todolistArray = todolists.map((tl) => {
        return (
            <Grid item key={tl.id}>
                <Paper elevation={3} style={{padding: '25px'}}>
                    <Todolist todolist={tl}/>
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
