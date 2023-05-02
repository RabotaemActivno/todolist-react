import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterValuesType } from "./App";
import { error } from "console";

export type TaskType = {
    id: string 
    title: string
    isDone: boolean
}
type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTasks: (id: string, todolistId:string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId:string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId:string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
}

export function Todolist(props: PropsType) {
    // Внешние функции
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            props.addTask(title, props.id)
            setTitle('')
        }
    }

    const addTask = () => {
        if (title.trim() !== '') {
            props.addTask(title, props.id)
            setTitle('')
        } else {
            setError('Title is required')
        }
       
    }
    const onAllClickHandler = () => { props.changeFilter('all', props.id) }
    const onActiveClickHandler = () => { props.changeFilter('active', props.id) }
    const onCompletedClickHandler = () => { props.changeFilter('completed', props.id) }
    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }

    //JSX-разметка

    return (
        <div>
            <h3>{props.title}<button onClick={removeTodolist}>x</button></h3>
            <div>
                <input value={title} 
                onChange={onNewTitleChangeHandler} 
                onKeyPress={onKeyPressHandler} 
                className={error ? "error": ''}/>
                <button onClick={addTask}>+</button>
                {error && <div className="error-message">{error}</div>}
            </div>
            <ul>
                {
                    props.tasks.map(t => {

                        const onRemoveHandler = (() => { props.removeTasks(t.id, props.id) })
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
                            console.log(t.id);
                        }

                        return <li className={t.isDone ? 'is-done': ''} key={t.id}>
                            <input type="checkbox" 
                                    checked={t.isDone} 
                                    onChange={onChangeHandler} />
                            <span>{t.title}</span>
                            <button onClick={onRemoveHandler}>x</button>
                        </li>
                    }
                    )}
            </ul>
            <div>
                <button onClick={onAllClickHandler} className={props.filter === "all" ? "active-task" : ''}>All</button>
                <button onClick={onActiveClickHandler} className={props.filter === "active" ? "active-task" : ''}>Active</button>
                <button onClick={onCompletedClickHandler} className={props.filter === "completed" ? "active-task" : ''}>Completed</button>
            </div>
        </div>
    )
}