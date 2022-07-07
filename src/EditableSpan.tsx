import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {TextField} from "@material-ui/core";


type PropsType = {
    title: string
    changeTitle: (title: string) => void
}

export function EditableSpan(props: PropsType) {

    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)

    const onEditMode = () => {
        setEditMode(true)
    }
    const offEditMode = () => {
        setEditMode(false)
        props.changeTitle(title);
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' && offEditMode();
    }

    return (
        editMode
            ?
            // <input value={title}
            //        autoFocus={true}
            //        onBlur={offEditMode}
            //        onChange={onChangeHandler}
            //        onKeyDown={onEnterHandler}
            // />
            <TextField label="Task name"
                       value={title}
                       autoFocus={true}
                       onBlur={offEditMode}
                       onChange={onChangeHandler}
                       onKeyDown={onEnterHandler}
            />
            :
            <span onDoubleClick={onEditMode}>
            {title}
        </span>
    );
}

