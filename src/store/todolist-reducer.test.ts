
import {ChangeFilterAT, todolistReducer, TodolistType} from "./todolist-reducer";

test('Correct filter of the todolist should have been changed', () => {
    // 1. Тестовые данные (сами придумываем, сами создаём)

    const todolists: Array<TodolistType> = [
        { id: '1', title: 'What to learn', filter: 'all' },
        { id: '2', title: 'What to buy', filter: 'all' },
    ]

    // 2. Вызов тестируемой функции
    const action: ChangeFilterAT = {
        type: 'CHANGE-TODOLIST-FILTER',
        todolistID: '2',
        filter: 'active'
    }

    const newState = todolistReducer(todolists, action)

    // 3. Проверка (совпадают ли наши ожидания с реальностью)

    expect(newState.length).toBe(2)
    expect(newState[0].filter).toBe('all')
    expect(newState[1].filter).toBe('active')
})

// TDD - Test Driven Development

test('Correct title of the todolist should have been changed', () => {
    // 1. Тестовые данные
    const todolists: Array<TodolistType> = [
        { id: '1', title: 'What to learn', filter: 'all' },
        { id: '2', title: 'What to buy', filter: 'all' },
    ]

    // 2. Вызов тестируемой функции
    const newState = todolistReducer(todolists, { type: "CHANGE-TODOLIST-TITLE", todolistID: '1', title: 'Bla-bla-bla'})

    // 3. Проверка результата вызова функции (ожидания)
    expect(newState[0].title).toBe('Bla-bla-bla')
    expect(newState[1].title).toBe('What to buy')
    expect(newState.length).toBe(2)
})
