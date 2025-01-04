import { useState } from 'react'
import './AddTodo.css'

function AddTodo({ onAddTodo }) {
  const [text, setText] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (text.trim()) {
      onAddTodo(text)
      setText('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="add-todo-form">
      <div className="input-container">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What needs to be done?"
          className="add-todo-input"
          maxLength={200}
        />
        <button
          type="submit"
          className="add-todo-btn"
          disabled={!text.trim()}
          aria-label="Add todo"
        >
          <span className="add-icon">+</span>
        </button>
      </div>
    </form>
  )
}

export default AddTodo
