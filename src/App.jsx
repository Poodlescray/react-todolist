import { Tabs } from "./components/Tabs"
import { TodoHeaders } from "./components/TodoHeaders"
import { TodoInput } from "./components/TodoInput"
import { TodoList } from "./components/TodoList"
import { TodoCard } from "./components/TodoCard"
import { useEffect, useState } from 'react'
function App() {
  // const todos = [
  //   {input: 'First Task', complete: false},
  //   {input: 'Second Task', complete: true},
  //   {input: 'Third Task', complete: true},
  //   {input: 'Fourth Task', complete: false},
  // ]
  const [ todos, setTodos ] = useState([{input: 'First Task', complete: true}])
  const [ selectedTab, setSelectedTab ] = useState('All')
  function handleAddTodo(newTodo) {
    const newTodoList = [...todos, {input: newTodo, complete: false}]
    setTodos(newTodoList)
    handleSaveData(newTodoList)
  }
  function handleUpdateTodo(index) {
    let newTodoList = [...todos]
    let completedTodo = todos[index]
    completedTodo['complete'] = true
    newTodoList[index] = completedTodo
    setTodos(newTodoList)
    handleSaveData(newTodoList)
  }
  function handleDeleteTodo(index) {
    let newTodoList = todos.filter((val, valIndex) => {
      return valIndex !== index
    })
    setTodos(newTodoList)
    handleSaveData(newTodoList)
  }

  function handleSaveData(currentTodos) {
    localStorage.setItem('todolist', JSON.stringify({todos: currentTodos}))
  }
  useEffect(() => {
    if (!localStorage || !localStorage.getItem('todolist')) return
    let db = JSON.parse(localStorage.getItem('todolist'))
    setTodos(db.todos)
}, []);

return(
<>
<TodoHeaders todos = {todos}/>
<Tabs selectedTab = {selectedTab}  setSelectedTab = {setSelectedTab} todos = {todos}/>
<TodoList handleUpdateTodo = {handleUpdateTodo} handleDeleteTodo= {handleDeleteTodo} selectedTab = {selectedTab} todos = {todos}/>
<TodoInput handleAddTodo = {handleAddTodo}/>
</>
)
}

export default App
