import {combineReducers, legacy_createStore as createStore} from "redux";
import {tasksReducer} from "./tasks-reducers";
import {todolistReducer} from "./todolist-reducer";


const rootReducer = combineReducers({  //! корневой редьюсер - (combineReducers возвращает функцию  reducer)
    tasks: tasksReducer,
    todolists: todolistReducer
})

export type AppRootStateType = ReturnType<typeof rootReducer> // Тип всего общего state приложения


// store принимает на вход один(!) reduceR
export const store = createStore(rootReducer) // Передаётся по контексту

// _state - приватное поле, напрямую не обращаемся

// getState() // вызывает useSelector из store через контекст
// subscribe(callback) // callback вызывается, когда изменился state // за нас делает useSelector

// dispatch(action) //  вызывает reducer, передавая action - обновляет стейт // вызывается из контекста через хук useDispatch (react-redux)


// Чисто отладочная информация
// @ts-ignore
window.store = store