import React, { useState } from 'react';
import './App.css';
import { Todolist, TaskType } from './Todolist';
import { v1 } from 'uuid';
import { Header } from './header';

export type FilterValuesType = 'all' | 'completed' | 'active'
type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}

function App() {

  function addTodolist(title: string) {
    let defaultId = v1()
    
    let defaultTaskObj = [
      { id: v1(), title: "spok", isDone: true },
      { id: v1(), title: "chpock", isDone: true },
      { id: v1(), title: "mock", isDone: false },
      { id: v1(), title: "poook", isDone: false },
      { id: v1(), title: "nock", isDone: false }
    ]
    
    let newTodolist: TodolistType = { id: defaultId, title: title, filter: 'all'}
    
    setTodolists([newTodolist, ...todolists])

    setTasks(Object.assign(tasksObj, {
      [defaultId]: defaultTaskObj      
    }))
  }

  function removeTask(id: string, todolistId: string) {
    let tasks = tasksObj[todolistId]
    let filteredTasks = tasks.filter((t: any) => t.id !== id)
    tasksObj[todolistId] = filteredTasks
    setTasks({ ...tasksObj })
  }

  function addTask(title: string, todolistId: string) {
    let newTask = { id: v1(), title: title, isDone: false }
    let tasks = tasksObj[todolistId]
    let newTasks = [newTask, ...tasks]
    tasksObj[todolistId] = newTasks

    setTasks({ ...tasksObj })
  }

  function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
    let tasks = tasksObj[todolistId]
    let task = tasks.find((t: any) => t.id === taskId)
    if (task) {
      task.isDone = isDone
      setTasks({ ...tasksObj })
    }
  }

  function changeFilter(value: FilterValuesType, todolistId: string) {
    let todolist = todolists.find(tl => tl.id === todolistId);
    if (todolist) {
      todolist.filter = value;
      setTodolists([...todolists])
    }
  }
  
  let [todolists, setTodolists] = useState<Array<TodolistType>>([
    // { id: todolistId1, title: 'what to learn', filter: 'active' },
    // { id: todolistId2, title: 'what to buy', filter: 'completed' },
  ])

  let removeTodolist = (todolistId: string) => {
    let filteredTodolist = todolists.filter(tl => tl.id !== todolistId)
    setTodolists(filteredTodolist)

    delete tasksObj[todolistId];
    setTasks({ ...tasksObj });
  }
  type TaskObj = {
    [index: string] : {id: string, title: string, isDone: boolean}[]
  }

  let [tasksObj, setTasks] = useState<TaskObj>({
    // [todolistId1]: [
    //   { id: v1(), title: "CSS", isDone: true },
    //   { id: v1(), title: "js", isDone: true },
    //   { id: v1(), title: "react", isDone: false }
    // ],
    // [todolistId2]: [
    //   { id: v1(), title: "spok", isDone: true },
    //   { id: v1(), title: "chpock", isDone: true },
    //   { id: v1(), title: "mock", isDone: false },
    //   { id: v1(), title: "poook", isDone: false },
    //   { id: v1(), title: "nock", isDone: false }
    // ],
    // [todolistId3]: [
    //   { id: v1(), title: "spok", isDone: true },
    //   { id: v1(), title: "chpock", isDone: true },
    //   { id: v1(), title: "mock", isDone: false },
    //   { id: v1(), title: "poook", isDone: false },
    //   { id: v1(), title: "nock", isDone: false }
    // ]
  });


  return (
    <div className="App">
      <Header addTodolist={addTodolist} />
      <div className='Ap'>
        {
         todolists.map((tl) => {

            let tasksForTodolist = tasksObj[tl.id];

            if (tl.filter === "completed") {
              tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true);
            }
            if (tl.filter === "active") {
              tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false);
            }
            return <Todolist key={tl.id}
              removeTodolist={removeTodolist}
              id={tl.id}
              title={tl.title}
              addTask={addTask}
              tasks={tasksForTodolist}
              removeTasks={removeTask}
              changeFilter={changeFilter}
              changeTaskStatus={changeStatus}
              filter={tl.filter}
            />
          })
        }
      </div>
    </div>
  );
}

export default App;
