import {tasksReducer, TasksType} from "./tasks-reducers";
import {addTodolistAC, todolistReducer, TodolistType} from "./todolist-reducer";

test('Todolist and Tasks should be added', () => {

    const todolists: Array<TodolistType> = [
        {id: '1', title: 'What to learn', filter: 'all'},
        {id: '2', title: 'What to buy', filter: 'all'},
    ]

    const tasks: TasksType = {
        '1': [
            { id: '1', title: "HTML&CSS", isDone: true },
            { id: '2', title: "ReactJS", isDone: true },
            { id: '3', title: "Python", isDone: true }
        ],
        '2': [
            { id: '1', title: "Chocolate", isDone: true },
            { id: '2', title: "Fresh Water", isDone: false },
            { id: '3', title: "Fresh Apple Juice", isDone: false },
        ]
    }

    const action = addTodolistAC('What read')
    const newTodolists = todolistReducer(todolists, action)
    const newTasks = tasksReducer(tasks, action)

    expect(newTasks[newTodolists[2].id]).toEqual([])
})




