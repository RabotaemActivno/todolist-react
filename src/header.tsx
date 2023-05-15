import React, { ChangeEvent, KeyboardEvent, useState } from "react";

type HeaderPropsType = {
    value?: string
    addTodolist: (title: string) => void
}

export function Header(props: HeaderPropsType) {
    const [titleTl, setTitleTl] = useState('')
    const [error, setError] = useState<string | null>(null)
    const addTodolist = () => {
        if (titleTl.trim() !== '') {
            props.addTodolist(titleTl)
            setTitleTl('')
        } else {
            setError('Title is required')
        }
    }
    const onClickHandler = () => {
        addTodolist()
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key=== 'Enter') {
            addTodolist()
            setTitleTl('')
        }
    }
    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitleTl(e.currentTarget.value)
    }

    return (
        <div className="header">
            <div className="header_wrapper">
                <input className={error ? "error header_input" : 'header_input'}
                    value={titleTl}
                    onKeyDown={onKeyPressHandler}
                    onChange={onChangeHandler} 
                    placeholder={error ? error : ''} />
                <button onClick={onClickHandler}>+</button>
            </div>
        </div>
    )
}