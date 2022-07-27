import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type PropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: PropsType) {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (title.trim() !== "") {
            props.addItem(title.trim());
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key === "Enter") {
            addItem();
        }
    }

    return (
        <div>
            {/*<input value={title}*/}
            {/*       onChange={onChangeHandler}*/}
            {/*       onKeyDown={onKeyPressHandler}*/}
            {/*       className={error ? "error" : ""}*/}
            {/*/>*/}
            <TextField label="Add new task..."
                       variant="outlined"
                       onChange={onChangeHandler}
                       onKeyDown={onKeyPressHandler}
                       value={title}

                       error={!!error}
                       helperText={error}
            />

            {/*<button onClick={addItem}>+</button>*/}
            <IconButton onClick={addItem} color={'primary'} >
                <AddBox fontSize={'inherit'}/>
            </IconButton>
            {/*{error && <div className="error-message">{error}</div>}*/}
        </div>
    );
}
