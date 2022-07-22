import {v1} from "uuid";
import {ADD_TODOLIST, AddTodolistAT, REMOVE_TODOLIST, RemoveTodolistAT} from "./todolist-reducer";

export type TasksType = {
    [todolistID: string]: Array<TaskType>
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}


export const REMOVE_TASK_TYPE = 'REMOVE-TASK-TYPE'
export const ADD_TASK_TYPE = 'ADD-TASK-TYPE'
export const CHANGE_TASK_STATUS_TYPE = 'CHANGE-TASK-STATUS-TYPE'
export const CHANGE_TASK_TITLE_TYPE = 'CHANGE-TASK-TITLE-TYPE'


export type ActionType = RemoveTaskAT | AddTaskAT | ChangeTaskStatusAT | ChangeTaskTitleAT | AddTodolistAT | RemoveTodolistAT
export type RemoveTaskAT = ReturnType<typeof removeTaskAC>
export type AddTaskAT = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>


export const tasksReducer = (tasks: TasksType, action: ActionType): TasksType => {

    switch (action.type) {
        case REMOVE_TASK_TYPE:
            return {
                ...tasks,
                [action.todolistID]: tasks[action.todolistID].filter((t) => t.id !== action.taskID)
            }
        case ADD_TASK_TYPE:
            const newTask: TaskType = {
                id: action.id,
                title: action.title,
                isDone: false
            }
            return {
                ...tasks,
                [action.todolistID]: [newTask, ...tasks[action.todolistID]]
            }
        case CHANGE_TASK_STATUS_TYPE:
            return {
                ...tasks,
                [action.todolistID]: tasks[action.todolistID].map((t) => t.id === action.taskID ? {
                    ...t,
                    isDone: action.isDone
                } : t)
            }

        case CHANGE_TASK_TITLE_TYPE:
            return {
                ...tasks,
                [action.todolistID]: tasks[action.todolistID].map((t) => t.id === action.taskID ? {
                    ...t,
                    title: action.title
                } : t)
            }
        case ADD_TODOLIST:
            return {
                ...tasks,
                [action.todolistID]: []
            }
        case REMOVE_TODOLIST:
            const newTasks = {...tasks}
            delete newTasks[action.todolistID]
            return newTasks
        default:
            return tasks
    }

}


export const removeTaskAC = (todolistID: string, taskID: string) => ({
    type: REMOVE_TASK_TYPE,
    todolistID,
    taskID
}) as const

export const addTaskAC = (todolistID: string, title: string) => ({
    type: ADD_TASK_TYPE,
    id: v1(),
    todolistID,
    title
}) as const

export const changeTaskStatusAC = (todolistID: string, taskID: string, isDone: boolean) => ({
    type: CHANGE_TASK_STATUS_TYPE,
    todolistID,
    taskID,
    isDone
}) as const

export const changeTaskTitleAC = (todolistID: string, taskID: string, title: string) => ({
    type: CHANGE_TASK_TITLE_TYPE,
    todolistID,
    taskID,
    title
}) as const
