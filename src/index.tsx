import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {store} from "./store/store";
import {Provider} from 'react-redux';


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)
root.render(
    <Provider store={store}>
        <App/>
    </Provider>
)

// react-redux
// 1.
// HOC - connect()()

// 2. useSelector() - возвращает новый стейт и занимается перерисовкой
// 3. useDispatch() - диспатчит action (диспатчит во все редуюсер)


serviceWorker.unregister();
