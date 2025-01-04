import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import TodoList from '../TodoList';

// Mock the child TodoItem component to simplify testing
vi.mock('../TodoItem', () => ({
  default: ({ todo, onToggle, onDelete, onEdit }) => (
    <div data-testid={`todo-item-${todo.id}`}>
      <span>{todo.text}</span>
      <button onClick={onToggle}>Toggle</button>
      <button onClick={onDelete}>Delete</button>
      <button onClick={() => onEdit('Edited')}>Edit</button>
    </div>
  )
}));

describe('TodoList component', () => {
  const mockTodos = [
    { id: 1, text: 'Task 1', completed: false, createdAt: new Date().toISOString() },
    { id: 2, text: 'Task 2', completed: true, createdAt: new Date().toISOString() }
  ];
  
  const mockFunctions = {
    onToggleTodo: vi.fn(),
    onDeleteTodo: vi.fn(),
    onEditTodo: vi.fn()
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('displays empty message when there are no todos', () => {
    render(<TodoList todos={[]} {...mockFunctions} />);
    
    expect(screen.getByText(/no todos yet/i)).toBeInTheDocument();
  });

  it('renders the correct number of TodoItem components', () => {
    render(<TodoList todos={mockTodos} {...mockFunctions} />);
    
    expect(screen.getByTestId('todo-item-1')).toBeInTheDocument();
    expect(screen.getByTestId('todo-item-2')).toBeInTheDocument();
    expect(screen.getAllByTestId(/todo-item/)).toHaveLength(2);
  });

  it('calls the appropriate function with the correct id when a todo is toggled', () => {
    render(<TodoList todos={mockTodos} {...mockFunctions} />);
    
    // Find the toggle button for the first todo
    const toggleButton = screen.getByText('Toggle', { selector: `#todo-item-1 button, [data-testid="todo-item-1"] button` });
    toggleButton.click();
    
    expect(mockFunctions.onToggleTodo).toHaveBeenCalledWith(1);
  });

  it('calls the appropriate function with the correct id when a todo is deleted', () => {
    render(<TodoList todos={mockTodos} {...mockFunctions} />);
    
    // Find the delete button for the second todo
    const deleteButton = screen.getByText('Delete', { selector: `#todo-item-2 button, [data-testid="todo-item-2"] button` });
    deleteButton.click();
    
    expect(mockFunctions.onDeleteTodo).toHaveBeenCalledWith(2);
  });

  it('calls the appropriate function with the correct id and text when a todo is edited', () => {
    render(<TodoList todos={mockTodos} {...mockFunctions} />);
    
    // Find the edit button for the first todo
    const editButton = screen.getByText('Edit', { selector: `#todo-item-1 button, [data-testid="todo-item-1"] button` });
    editButton.click();
    
    expect(mockFunctions.onEditTodo).toHaveBeenCalledWith(1, 'Edited');
  });
});
