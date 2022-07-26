import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete as DeleteIcon} from "@material-ui/icons";
import {useDispatch} from "react-redux";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./store/tasks-reducers";
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./store/todolist-reducer";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TasksType = {
    [todolistID: string]: Array<TaskType>
}

type PropsType = {
    todolistID: string
    title: string
    filter: FilterValuesType
    tasks: TasksType
}

export function Todolist(props: PropsType) {

    const dispatch = useDispatch()

    const onAllClickHandler = () => dispatch(changeTodolistFilterAC(props.todolistID, "all"))
    const onActiveClickHandler = () => dispatch(changeTodolistFilterAC(props.todolistID, "active"))
    const onCompletedClickHandler = () => dispatch(changeTodolistFilterAC(props.todolistID, "completed"))

    let tasksForTodolist = props.tasks[props.todolistID];
    if (props.filter === "active") {
        tasksForTodolist = props.tasks[props.todolistID].filter((t) => !t.isDone);
    }
    if (props.filter === "completed") {
        tasksForTodolist = props.tasks[props.todolistID].filter((t) => t.isDone);
    }

    const addTask = (title: string) => {
        dispatch(addTaskAC(props.todolistID, title))
    }


    const onDeleteHandler = () => {
        dispatch(removeTodolistAC(props.todolistID))
    }

    const changeTodolistTitle = (title: string) => {
        dispatch(changeTodolistTitleAC(props.todolistID, title))
    }


    return <div>
        <h3>
            <EditableSpan title={props.title} changeTitle={changeTodolistTitle}/>


            {/*<button onClick={onDeleteHandler}>X</button>*/}
            <IconButton onClick={onDeleteHandler}
                        aria-label="delete"
                        color="secondary"
            >
                <DeleteIcon fontSize="large"/>
            </IconButton>
        </h3>

        <AddItemForm addItem={addTask}/>

        <ul>
            {
                tasksForTodolist.map((t) => {
                    const onClickHandler = () => dispatch(removeTaskAC(props.todolistID, t.id))
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        dispatch(changeTaskStatusAC(props.todolistID, t.id, e.currentTarget.checked))
                    }

                    const changeTaskTitle = (title: string) => {
                        dispatch(changeTaskTitleAC(props.todolistID, t.id, title))
                    }

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        {/*<input type="checkbox"*/}
                        {/*       onChange={onChangeHandler}*/}
                        {/*       checked={t.isDone}/>*/}
                        <Checkbox
                            onChange={onChangeHandler}
                            checked={t.isDone}
                        />

                        {/*<span>{t.title}</span>*/}
                        <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                        {/*<button onClick={onClickHandler}>x</button>*/}
                        <IconButton onClick={onClickHandler}
                                    aria-label="delete"
                                    size="small"
                                    color="secondary"
                        >
                            <DeleteIcon/>
                        </IconButton>
                    </li>
                })
            }
        </ul>
        <div>
            <Button onClick={onAllClickHandler}
                    variant="contained"
                    disableElevation
                    color={props.filter === 'all' ? "primary" : "default"}
                    style={{margin: "5px"}}
            >
                All
            </Button>
            <Button onClick={onActiveClickHandler}
                    variant="contained"
                    disableElevation
                    color={props.filter === 'active' ? "primary" : "default"}
                    style={{margin: "5px"}}
            >
                Active
            </Button>
            <Button
                onClick={onCompletedClickHandler}
                variant="contained"
                disableElevation
                color={props.filter === 'completed' ? "primary" : "default"}
                style={{margin: "5px"}}
            >
                Completed
            </Button>

            {/*<button className={props.filter === 'all' ? "active-filter" : ""}*/}
            {/*        onClick={onAllClickHandler}>All*/}
            {/*</button>*/}
            {/*<button className={props.filter === 'active' ? "active-filter" : ""}*/}
            {/*        onClick={onActiveClickHandler}>Active*/}
            {/*</button>*/}
            {/*<button className={props.filter === 'completed' ? "active-filter" : ""}*/}
            {/*        onClick={onCompletedClickHandler}>Completed*/}
            {/*</button>*/}
        </div>
    </div>
}
