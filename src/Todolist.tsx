import React, { ChangeEvent } from 'react';
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import { Button, Checkbox, IconButton } from "@material-ui/core";
import { Delete as DeleteIcon } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TaskType } from "./store/tasks-reducers";
import { changeTodolistFilterAC, TodolistType } from "./store/todolist-reducer";
import { AppRootStateType } from "./store/store";
import { TodolistHeader } from "./store/components/TodolistHeader";


type PropsType = {
    todolist: TodolistType
}

export function Todolist(props: PropsType) {
    // use принимает callback, который принимает на вход state всего приложения, и возвращает тот state, который мы хотим.
    const tasks = useSelector<AppRootStateType, Array<TaskType>>(appRootState => appRootState.tasks[props.todolist.id])
    const dispatch = useDispatch()

    const onAllClickHandler = () => dispatch(changeTodolistFilterAC(props.todolist.id, "all"))
    const onActiveClickHandler = () => dispatch(changeTodolistFilterAC(props.todolist.id, "active"))
    const onCompletedClickHandler = () => dispatch(changeTodolistFilterAC(props.todolist.id, "completed"))

    let tasksForTodolist = tasks;
    if (props.todolist.filter === "active") {
        tasksForTodolist = tasks.filter((t) => !t.isDone);
    }
    if (props.todolist.filter === "completed") {
        tasksForTodolist = tasks.filter((t) => t.isDone);
    }

    const addTask = (title: string) => {
        dispatch(addTaskAC(props.todolist.id, title))
    }


    return (
        <div>

            <TodolistHeader
                todolistID={props.todolist.id}
                title={props.todolist.title}
            />

            <AddItemForm addItem={addTask} />

            <ul>
                {
                    tasksForTodolist.map((t) => {
                        const onClickHandler = () => dispatch(removeTaskAC(props.todolist.id, t.id))
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            dispatch(changeTaskStatusAC(props.todolist.id, t.id, e.currentTarget.checked))
                        }

                        const changeTaskTitle = (title: string) => {
                            dispatch(changeTaskTitleAC(props.todolist.id, t.id, title))
                        }

                        return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                            <Checkbox
                                onChange={onChangeHandler}
                                checked={t.isDone}
                            />


                            <EditableSpan title={t.title} changeTitle={changeTaskTitle} />

                            <IconButton onClick={onClickHandler}
                                aria-label="delete"
                                size="small"
                                color="secondary"
                            >
                                <DeleteIcon />
                            </IconButton>
                        </li>
                    })
                }
            </ul>
            <div>
                <Button onClick={onAllClickHandler}
                    variant="contained"
                    disableElevation
                    color={props.todolist.filter === 'all' ? "primary" : "default"}
                    style={{ margin: "5px" }}
                >
                    All
                </Button>
                <Button onClick={onActiveClickHandler}
                    variant="contained"
                    disableElevation
                    color={props.todolist.filter === 'active' ? "primary" : "default"}
                    style={{ margin: "5px" }}
                >
                    Active
                </Button>
                <Button
                    onClick={onCompletedClickHandler}
                    variant="contained"
                    disableElevation
                    color={props.todolist.filter === 'completed' ? "primary" : "default"}
                    style={{ margin: "5px" }}
                >
                    Completed
                </Button>
            </div>
        </div>
    )
}
