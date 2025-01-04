import { useState } from 'react'
import './TodoItem.css'

function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)

  const handleEditSubmit = (e) => {
    e.preventDefault()
    if (editText.trim()) {
      onEdit(editText)
      setIsEditing(false)
    }
  }

  const handleEditCancel = () => {
    setEditText(todo.text)
    setIsEditing(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      handleEditCancel()
    }
  }

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <button
        className={`toggle-btn ${todo.completed ? 'checked' : ''}`}
        onClick={onToggle}
        aria-label={`Mark as ${todo.completed ? 'incomplete' : 'complete'}`}
      >
        {todo.completed && <span className="checkmark">✓</span>}
      </button>

      {isEditing ? (
        <form onSubmit={handleEditSubmit} className="edit-form">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="edit-input"
            autoFocus
          />
          <div className="edit-actions">
            <button type="submit" className="save-btn" disabled={!editText.trim()}>
              Save
            </button>
            <button type="button" onClick={handleEditCancel} className="cancel-btn">
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <span className="todo-text" onDoubleClick={() => setIsEditing(true)}>
            {todo.text}
          </span>
          <div className="todo-actions">
            <button
              onClick={() => setIsEditing(true)}
              className="edit-btn"
              aria-label="Edit todo"
            >
              ✎
            </button>
            <button
              onClick={onDelete}
              className="delete-btn"
              aria-label="Delete todo"
            >
              ✕
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default TodoItem
