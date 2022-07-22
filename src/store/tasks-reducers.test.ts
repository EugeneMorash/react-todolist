import {
    addTaskAC,
    AddTaskAT,
    changeTaskStatusAC,
    ChangeTaskStatusAT,
    changeTaskTitleAC,
    ChangeTaskTitleAT,
    removeTaskAC,
    RemoveTaskAT,
    tasksReducer,
    TasksType
} from "./tasks-reducers";
import {removeTodolistAC} from "./todolist-reducer";

let tasks: TasksType;

beforeEach(() => {
    // Запускается callback каждый раз, перед тем когда запускается функция test

    tasks = {
        '1': [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "ReactJS", isDone: true},
            {id: '3', title: "Python", isDone: true}
        ],
        '2': [
            {id: '1', title: "Chocolate", isDone: true},
            {id: '2', title: "Fresh Water", isDone: false},
            {id: '3', title: "Fresh Apple Juice", isDone: false},
        ]
    }
})


test('Correct task should been removed', () => {
    // 1. Тестовые данные

    const action: RemoveTaskAT = removeTaskAC('1', '3')

    // 2. Вызов тестируемой функции

    const newTasks = tasksReducer(tasks, action)

    // 3. Проверка результата
    // expect(newTasks['1'].length).toBe(2)
    // expect(newTasks['2'].length).toBe(3)

    expect(newTasks).toEqual(
        {
            '1': [
                {id: '1', title: "HTML&CSS", isDone: true},
                {id: '2', title: "ReactJS", isDone: true},
            ],
            '2': [
                {id: '1', title: "Chocolate", isDone: true},
                {id: '2', title: "Fresh Water", isDone: false},
                {id: '3', title: "Fresh Apple Juice", isDone: false},
            ]
        }
    )

})

test('Correct task should been added to start', () => {
    const action: AddTaskAT = addTaskAC('1', 'JavaScript')

    const newTasks = tasksReducer(tasks, action)

    expect(newTasks['1'].length).toBe(4)
    expect(newTasks['1'][0].title).toBe('JavaScript')
    expect(newTasks['2'].length).toBe(3)
    expect(newTasks['1'][0].isDone).toBe(false)
})

test('Correct task should been change status', () => {
    const action: ChangeTaskStatusAT = changeTaskStatusAC('2', '2', true)

    const newTasks = tasksReducer(tasks, action)

    expect(newTasks).toEqual({
        '1': [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "ReactJS", isDone: true},
            {id: '3', title: "Python", isDone: true}
        ],
        '2': [
            {id: '1', title: "Chocolate", isDone: true},
            {id: '2', title: "Fresh Water", isDone: true},
            {id: '3', title: "Fresh Apple Juice", isDone: false},
        ]
    })

})

test('Correct task should been change title', () => {
    const action: ChangeTaskTitleAT = changeTaskTitleAC('2', '2', "Fresh Beer")

    const newTasks = tasksReducer(tasks, action)

    expect(newTasks).toEqual({
        '1': [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "ReactJS", isDone: true},
            {id: '3', title: "Python", isDone: true}
        ],
        '2': [
            {id: '1', title: "Chocolate", isDone: true},
            {id: '2', title: "Fresh Beer", isDone: false},
            {id: '3', title: "Fresh Apple Juice", isDone: false},
        ]
    })

})

test('Tasks list should be removed', () => {
    const action = removeTodolistAC('2')
    const newTasks = tasksReducer(tasks, action)


    expect(newTasks).toEqual({
        '1': [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "ReactJS", isDone: true},
            {id: '3', title: "Python", isDone: true}
        ]
    })
})


