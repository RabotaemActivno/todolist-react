import React, { useState } from "react";

type HeaderPropsType = {
    value?: string
    addTodolist: (title:string) => void
}

export function Header (props: HeaderPropsType) {
    const [titleTl, setTitleTl] = useState('')

    return (
        <div className="header">
            <input value={titleTl} onChange={(e) =>{
                setTitleTl(e.currentTarget.value)}}/>
            <button onClick={()=> {props.addTodolist(titleTl)}}>+</button>
        </div>
    )
}