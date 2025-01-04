import { useState, useEffect } from 'react'
import TodoList from './components/TodoList'
import AddTodo from './components/AddTodo'
import './App.css'

function App() {
  const [todos, setTodos] = useState([
    // Temporary test data to debug visibility
    { id: 1, text: "Test todo item", completed: false, createdAt: new Date().toISOString() },
    { id: 2, text: "Another test item", completed: true, createdAt: new Date().toISOString() }
  ])

  // Load todos from localStorage on component mount
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos')
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos))
    }
  }, [])

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text: text.trim(),
      completed: false,
      createdAt: new Date().toISOString()
    }
    setTodos(prevTodos => [...prevTodos, newTodo])
  }

  const toggleTodo = (id) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const deleteTodo = (id) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id))
  }

  const editTodo = (id, newText) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, text: newText.trim() } : todo
      )
    )
  }

  const clearCompleted = () => {
    setTodos(prevTodos => prevTodos.filter(todo => !todo.completed))
  }

  const completedCount = todos.filter(todo => todo.completed).length
  const activeCount = todos.length - completedCount

  return (
    <div className="app">
      <header className="app-header">
        <h1>My Todo List</h1>
        <p className="app-subtitle">Stay organized and get things done!</p>
      </header>
      
      <main className="app-main">
        <AddTodo onAddTodo={addTodo} />
        
        <div className="todo-stats">
          <span className="stat">
            Total: <strong>{todos.length}</strong>
          </span>
          <span className="stat">
            Active: <strong>{activeCount}</strong>
          </span>
          <span className="stat">
            Completed: <strong>{completedCount}</strong>
          </span>
        </div>

        <TodoList
          todos={todos}
          onToggleTodo={toggleTodo}
          onDeleteTodo={deleteTodo}
          onEditTodo={editTodo}
        />

        {completedCount > 0 && (
          <div className="clear-completed">
            <button onClick={clearCompleted} className="clear-btn">
              Clear Completed ({completedCount})
            </button>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
