import {combineReducers, legacy_createStore as createStore} from "redux";
import {tasksReducer} from "./tasks-reducers";
import {todolistReducer} from "./todolist-reducer";


const rootReducer = combineReducers({  //! корневой редьюсер - (combineReducers возвращает функцию  reducer)
    tasks: tasksReducer,
    todolists: todolistReducer
})

export type AppRootStateType = ReturnType<typeof rootReducer> // Тип всего общего state приложения


// store принимает на вход один(!) reduceR
export const store = createStore(rootReducer)
// _state
// getState()
// subscribe() // Вызывается, когда изменился state
// dispatch(action) //  вызывает reducer, передавая action


// Чисто отладочная информация
// @ts-ignore
window.store = store