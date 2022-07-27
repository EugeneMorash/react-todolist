import React, {FC} from 'react';
import {EditableSpan} from "../../EditableSpan";
import {IconButton} from "@material-ui/core";
import {Delete as DeleteIcon} from "@material-ui/icons";
import {changeTodolistTitleAC, removeTodolistAC} from "../todolist-reducer";
import {useDispatch} from "react-redux";

type PropsType = {
    todolistID: string
    title: string
}


export const TodolistHeader: FC<PropsType> = (
    {
        todolistID,
        title
    }
) => {

    const dispatch = useDispatch()

    const onDeleteHandler = () => {
        dispatch(removeTodolistAC(todolistID))
    }
    const changeTodolistTitle = (title: string) => {
        dispatch(changeTodolistTitleAC(todolistID, title))
    }

    return (
        <h3>
            <EditableSpan title={title} changeTitle={changeTodolistTitle}/>
            <IconButton onClick={onDeleteHandler}
                        aria-label="delete"
                        color="secondary"
            >
                <DeleteIcon fontSize="large"/>
            </IconButton>
        </h3>
    );
};
