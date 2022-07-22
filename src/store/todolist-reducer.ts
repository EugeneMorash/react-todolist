import {FilterValuesType} from "../App";
import {v1} from "uuid";

// Типизация State (Todolists)
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}


export const CHANGE_TODOLIST_FILTER = 'CHANGE-TODOLIST-FILTER'
export const CHANGE_TODOLIST_TITLE = 'CHANGE-TODOLIST-TITLE'
export const REMOVE_TODOLIST = "REMOVE-TODOLIST"
export const ADD_TODOLIST = "ADD-TODOLIST"

// Типизация объекта action
export type ActionType =
    ChangeFilterAT |
    ChangeTitleAT |
    RemoveTodolistAT |
    AddTodolistAT

export type ChangeFilterAT = ReturnType<typeof changeTodolistFilterAC>
export type ChangeTitleAT = ReturnType<typeof changeTodolistTitleAC>
export type RemoveTodolistAT = ReturnType<typeof removeTodolistAC>
export type AddTodolistAT = ReturnType<typeof addTodolistAC>


// Reducer - ЧИСТАЯ функция.
// Которая принимает на вход state и action.
// Возвращает новый state
// action - объект, который обязательно хранит свойство type
// Также может хранить ещё дополнительную информацию для преобразования state

export const todolistReducer = (todolists: Array<TodolistType>, action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case CHANGE_TODOLIST_FILTER:
            return (todolists.map((tl) => {
                return tl.id === action.todolistID ? {...tl, filter: action.filter} : tl
            }))
        case CHANGE_TODOLIST_TITLE:
            return todolists.map((tl) => {
                return tl.id === action.todolistID ? {...tl, title: action.title} : tl
            })
        case REMOVE_TODOLIST:
            return todolists.filter((tl) => {
                return tl.id !== action.todolistID
            })
        case ADD_TODOLIST:
            const newTodo: TodolistType = {
                id: action.todolistID,
                title: action.title,
                filter: 'all'
            }
            return [...todolists, newTodo]
        default:
            return todolists
    }
}

//*  ActionCreator - функция, которая возвращает объект action  *//

export const changeTodolistFilterAC = (todolistID: string, filter: FilterValuesType) => ({
    type: CHANGE_TODOLIST_FILTER,
    todolistID,
    filter
}) as const
export const changeTodolistTitleAC = (todolistID: string, title: string) => ({
    type: CHANGE_TODOLIST_TITLE,
    todolistID,
    title
}) as const
export const removeTodolistAC = (todolistID: string) => ({
    type: REMOVE_TODOLIST,
    todolistID
}) as const
export const addTodolistAC = (title: string) => ({
    type: ADD_TODOLIST,
    todolistID: v1(),
    title
}) as const



// 1. Создаём AC
// 2. Создаём AT (ReturnType<typeof AC>)
// 3. Пишем reducer


