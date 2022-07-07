import {FilterValuesType} from "../App";

// Типизация State (Todolists)
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}



// Типизация объекта action
export type ActionType =
    ChangeFilterAT |
    ChangeTitleAT
export type ChangeFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER'
    todolistID: string
    filter: FilterValuesType
}
export type ChangeTitleAT = {
    type: 'CHANGE-TODOLIST-TITLE'
    todolistID: string
    title: string
}


// reducer - ЧИСТАЯ функция
// Которая принимает на вход state и action
// Возвращает новый state
// action - объект, который обязательно хранит свойство type
// Также может хранить ещё дополнительную информацию для преобразования state

export const todolistReducer = (todolists: Array<TodolistType>, action: ActionType): Array<TodolistType> => {

    if (action.type === 'CHANGE-TODOLIST-FILTER') {
        return (todolists.map((tl) => {
            return tl.id === action.todolistID ? { ...tl, filter: action.filter } : tl
        }))
        // return (todolists.map((tl) => {
        //     return { ...tl, filter: action.filter }
        // }))
    } else if (action.type === 'CHANGE-TODOLIST-TITLE') {
        return todolists.map((tl) => {
            return tl.id === action.todolistID ?  {...tl, title: action.title} : tl
        })
    }

    return todolists
}


