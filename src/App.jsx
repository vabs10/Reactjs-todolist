import { useState, useEffect } from "react"
import TodoInput from "./components/TodoInput"
import TodoList from "./components/TodoList"

function App() {

const [todos, setTodos] = useState([
    'Go to the market',
    'Eat more carbs',
    'Code More'])
const [todoValue, setTodoValue] = useState('')

    function handleAddTodos(newTodo){
      const newTodoList = [...todos, newTodo]
      persistData(newTodoList)
      setTodos(newTodoList)
    }

    function handleDeleteTodos(index){
      const newTodoList = todos.filter((todo, todoIndex)=>{
        return todoIndex !== index
      })
      persistData(newTodoList)
      setTodos(newTodoList)
    }

    function handleEditTodos(index){
      const valueToBeEdited = todos[index]
      setTodoValue(valueToBeEdited)
      handleDeleteTodos(index)
    }

    function persistData(newList){
      localStorage.setItem('todos', JSON.stringify({todos: newList}))
    }

    useEffect(()=>{
      if(!localStorage){
        return
      }
      let localTodos = localStorage.getItem('todos')
      if(!localTodos){
        return
      }
      localTodos = JSON.parse(localTodos).todos
      setTodos(localTodos)
    },[])
  return (
    <>
      <TodoInput handleAddTodos={handleAddTodos} todoValue={todoValue} setTodoValue={setTodoValue} />
      <TodoList handleDeleteTodos={handleDeleteTodos} handleEditTodos={handleEditTodos} todos={todos} />
    </>
  )
}

export default App
