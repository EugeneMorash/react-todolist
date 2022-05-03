import React from 'react';
import {TodoList} from "./Todolist";




function App() {
    return (
        <div>
            <AppTitle subheading={'Many TODOLIST!!'}/>
            <TodoList title={"Junior"} />
            <TodoList title={"Cook"}/>
        </div>
    );
}


type AppTitlePropsType = {
    subheading: string
}


function AppTitle(props: AppTitlePropsType) {
    return (
        <h2>{props.subheading}</h2>
    )
}

export default App;
