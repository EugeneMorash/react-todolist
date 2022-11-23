import {
    ADD_TODOLIST, addTodolistAC,
    CHANGE_TODOLIST_FILTER, CHANGE_TODOLIST_TITLE,
    ChangeFilterAT, changeTodolistFilterAC, changeTodolistTitleAC, REMOVE_TODOLIST, removeTodolistAC,
    RemoveTodolistAT,
    todolistReducer,
    TodolistType
} from "./todolist-reducer";

// TDD - Test Driven Development - от теста к коду

let todolists: Array<TodolistType>;

beforeEach(() => {
    todolists = [
        {id: '1', title: 'What to learn', filter: 'all'},
        {id: '2', title: 'What to buy', filter: 'all'},
    ]
})

test('Correct filter of the todolist should have been changed', () => {
    // 1. Тестовые данные (сами придумываем, сами создаём)



    // 2. Вызов тестируемой функции
    // const action: ChangeFilterAT = {
    //     type: CHANGE_TODOLIST_FILTER,
    //     todolistID: '2',
    //     filter: 'active'
    // }

    const action = changeTodolistFilterAC('2', 'active')

    const newState = todolistReducer(todolists, action)

    // 3. Проверка (совпадают ли наши ожидания с реальностью)

    expect(newState.length).toBe(2)
    expect(newState[0].filter).toBe('all')
    expect(newState[1].filter).toBe('active')
})

test('Correct title of the todolist should have been changed', () => {
    // 1. Тестовые данные
    const todolists: Array<TodolistType> = [
        {id: '1', title: 'What to learn', filter: 'all'},
        {id: '2', title: 'What to buy', filter: 'all'},
    ]

    const action = changeTodolistTitleAC('1', 'Bla-bla-bla')
    // 2. Вызов тестируемой функции
    // const newState = todolistReducer(todolists, {type: CHANGE_TODOLIST_TITLE, todolistID: '1', title: 'Bla-bla-bla'})
    const newState = todolistReducer(todolists, action)

    // 3. Проверка результата вызова функции (ожидания)
    expect(newState[0].title).toBe('Bla-bla-bla')
    expect(newState[1].title).toBe('What to buy')
    expect(newState.length).toBe(2)
})


test('Correct todolist should have been removed', () => {
    // 1. Тестовые данные (которые подадим на вход в тестируемую функцию)
    const todolists: Array<TodolistType> = [
        {id: '1', title: 'What to learn', filter: 'all'},
        {id: '2', title: 'What to buy', filter: 'all'},
    ]

    // const action: RemoveTodolistAT = {
    //     type: REMOVE_TODOLIST,
    //     todolistID: '2'
    // }

    const action = removeTodolistAC('2')

    // 2. Вызов тестируемой функции

    const newState = todolistReducer(todolists, action)

    // 3. Проверка результата (ожидание)

    // expect(newState.length).toBe(1)
    // expect(newState[0].id).toBe('1')

    expect(newState).toEqual([
        {id: '1', title: 'What to learn', filter: 'all'}
    ])
})


test('Correct todolist should have been added', () => {


    const action = addTodolistAC('What to do')

    const newState = todolistReducer(todolists, action)

    expect(newState.length).toBe(3)
    expect(newState[2].id).toBeDefined()
    expect(newState[2].title).toBe('What to do')

})