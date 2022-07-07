import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete as DeleteIcon} from "@material-ui/icons";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolistID: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>

    removeTask: (todolistID: string, id: string) => void
    addTask: (todolistID: string, title: string) => void
    changeTaskStatus: (todolistID: string, taskId: string, isDone: boolean) => void

    deleteTodolist: (todolistID: string) => void
    changeTodolistTitle: (todolistID: string, title: string) => void
    changeTaskTitle: (todolistID: string, id: string, title: string) => void
    changeFilter: (todolistID: string, value: FilterValuesType) => void
}

export function Todolist(props: PropsType) {


    const onAllClickHandler = () => props.changeFilter(props.todolistID, "all");
    const onActiveClickHandler = () => props.changeFilter(props.todolistID, "active");
    const onCompletedClickHandler = () => props.changeFilter(props.todolistID, "completed");

    const addTask = (title: string) => {
        props.addTask(props.todolistID, title)
    }


    const onDeleteHandler = () => {
        props.deleteTodolist(props.todolistID)
    }

    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(props.todolistID, title)
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
                props.tasks.map((t) => {
                    const onClickHandler = () => props.removeTask(props.todolistID, t.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(props.todolistID, t.id, e.currentTarget.checked);
                    }

                    const changeTaskTitle = (title: string) => {
                        props.changeTaskTitle(props.todolistID, t.id, title)
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
