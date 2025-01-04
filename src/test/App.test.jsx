import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: vi.fn((key) => store[key] || null),
    setItem: vi.fn((key, value) => {
      store[key] = value.toString();
    }),
    clear: vi.fn(() => {
      store = {};
    }),
    removeItem: vi.fn((key) => {
      delete store[key];
    }),
    getAll: () => store,
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('App component', () => {
  beforeEach(() => {
    // Clear localStorage and mocks before each test
    localStorageMock.clear();
    vi.clearAllMocks();
  });

  it('renders the app header and empty todo list', () => {
    render(<App />);
    
    // Check for header elements
    expect(screen.getByText('My Todo List')).toBeInTheDocument();
    expect(screen.getByText('Stay organized and get things done!')).toBeInTheDocument();
    
    // Check for AddTodo component
    expect(screen.getByPlaceholderText('What needs to be done?')).toBeInTheDocument();
    
    // Check for empty todo list message
    expect(screen.getByText(/No todos yet/i)).toBeInTheDocument();
  });

  it('loads todos from localStorage on initial render', () => {
    // Setup localStorage with mock data
    const mockTodos = [
      { id: 1, text: 'Task from localStorage', completed: false, createdAt: new Date().toISOString() }
    ];
    
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify(mockTodos));
    
    render(<App />);
    
    // Todo from localStorage should be displayed
    expect(screen.getByText('Task from localStorage')).toBeInTheDocument();
    expect(localStorageMock.getItem).toHaveBeenCalledWith('todos');
  });

  it('adds a new todo when the form is submitted', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    // Fill in the add todo form and submit
    const input = screen.getByPlaceholderText('What needs to be done?');
    await user.type(input, 'New Todo Item');
    
    const addButton = screen.getByRole('button', { name: /add todo/i });
    await user.click(addButton);
    
    // The new todo should be displayed
    expect(screen.getByText('New Todo Item')).toBeInTheDocument();
    
    // Check if localStorage was updated
    await waitFor(() => {
      expect(localStorageMock.setItem).toHaveBeenCalled();
      const savedData = JSON.parse(localStorageMock.setItem.mock.calls[0][1]);
      expect(savedData[0].text).toBe('New Todo Item');
    });
  });

  it('toggles todo completion status', async () => {
    // Setup localStorage with mock data
    const mockTodos = [
      { id: 1, text: 'Toggle this task', completed: false, createdAt: new Date().toISOString() }
    ];
    
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify(mockTodos));
    
    const user = userEvent.setup();
    render(<App />);
    
    // Find the toggle button and click it
    const toggleButton = screen.getByRole('button', { name: /mark as complete/i });
    await user.click(toggleButton);
    
    // Check if localStorage was updated with completed status
    await waitFor(() => {
      expect(localStorageMock.setItem).toHaveBeenCalled();
      const savedData = JSON.parse(localStorageMock.setItem.mock.calls[0][1]);
      expect(savedData[0].completed).toBe(true);
    });
    
    // The todo item should now have the completed class
    const todoItem = screen.getByText('Toggle this task').closest('.todo-item');
    expect(todoItem).toHaveClass('completed');
  });

  it('deletes a todo', async () => {
    // Setup localStorage with mock data
    const mockTodos = [
      { id: 1, text: 'Task to delete', completed: false, createdAt: new Date().toISOString() }
    ];
    
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify(mockTodos));
    
    const user = userEvent.setup();
    render(<App />);
    
    // Initially, the todo should be displayed
    expect(screen.getByText('Task to delete')).toBeInTheDocument();
    
    // Find the delete button and click it
    const deleteButton = screen.getByRole('button', { name: /delete todo/i });
    await user.click(deleteButton);
    
    // The todo should no longer be displayed
    expect(screen.queryByText('Task to delete')).not.toBeInTheDocument();
    
    // Empty state message should be displayed
    expect(screen.getByText(/No todos yet/i)).toBeInTheDocument();
    
    // Check if localStorage was updated (empty array)
    await waitFor(() => {
      expect(localStorageMock.setItem).toHaveBeenCalled();
      const savedData = JSON.parse(localStorageMock.setItem.mock.calls[0][1]);
      expect(savedData).toHaveLength(0);
    });
  });

  it('edits a todo', async () => {
    // Setup localStorage with mock data
    const mockTodos = [
      { id: 1, text: 'Task to edit', completed: false, createdAt: new Date().toISOString() }
    ];
    
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify(mockTodos));
    
    const user = userEvent.setup();
    render(<App />);
    
    // Initially, the original todo text should be displayed
    expect(screen.getByText('Task to edit')).toBeInTheDocument();
    
    // Find the edit button and click it
    const editButton = screen.getByRole('button', { name: /edit todo/i });
    await user.click(editButton);
    
    // Edit the text
    const editInput = screen.getByRole('textbox');
    await user.clear(editInput);
    await user.type(editInput, 'Edited task');
    
    // Save the changes
    const saveButton = screen.getByRole('button', { name: /save/i });
    await user.click(saveButton);
    
    // The edited todo text should be displayed
    expect(screen.getByText('Edited task')).toBeInTheDocument();
    expect(screen.queryByText('Task to edit')).not.toBeInTheDocument();
    
    // Check if localStorage was updated with new text
    await waitFor(() => {
      expect(localStorageMock.setItem).toHaveBeenCalled();
      const savedData = JSON.parse(localStorageMock.setItem.mock.calls[0][1]);
      expect(savedData[0].text).toBe('Edited task');
    });
  });

  it('shows and updates todo statistics correctly', async () => {
    // Setup localStorage with mock data
    const mockTodos = [
      { id: 1, text: 'Completed task', completed: true, createdAt: new Date().toISOString() },
      { id: 2, text: 'Active task', completed: false, createdAt: new Date().toISOString() }
    ];
    
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify(mockTodos));
    
    render(<App />);
    
    // Check initial statistics
    expect(screen.getByText('Total: 2')).toBeInTheDocument();
    expect(screen.getByText('Active: 1')).toBeInTheDocument();
    expect(screen.getByText('Completed: 1')).toBeInTheDocument();
    
    // "Clear Completed" button should be visible
    expect(screen.getByText(/Clear Completed/i)).toBeInTheDocument();
  });

  it('clears completed todos', async () => {
    // Setup localStorage with mock data
    const mockTodos = [
      { id: 1, text: 'Completed task', completed: true, createdAt: new Date().toISOString() },
      { id: 2, text: 'Active task', completed: false, createdAt: new Date().toISOString() }
    ];
    
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify(mockTodos));
    
    const user = userEvent.setup();
    render(<App />);
    
    // Both todos should initially be displayed
    expect(screen.getByText('Completed task')).toBeInTheDocument();
    expect(screen.getByText('Active task')).toBeInTheDocument();
    
    // Click the "Clear Completed" button
    const clearButton = screen.getByText(/Clear Completed/i);
    await user.click(clearButton);
    
    // Completed todo should be removed
    expect(screen.queryByText('Completed task')).not.toBeInTheDocument();
    expect(screen.getByText('Active task')).toBeInTheDocument();
    
    // Statistics should be updated
    expect(screen.getByText('Total: 1')).toBeInTheDocument();
    expect(screen.getByText('Active: 1')).toBeInTheDocument();
    expect(screen.getByText('Completed: 0')).toBeInTheDocument();
    
    // Clear Completed button should no longer be displayed
    expect(screen.queryByText(/Clear Completed/i)).not.toBeInTheDocument();
    
    // Check if localStorage was updated correctly
    await waitFor(() => {
      expect(localStorageMock.setItem).toHaveBeenCalled();
      const savedData = JSON.parse(localStorageMock.setItem.mock.calls[0][1]);
      expect(savedData).toHaveLength(1);
      expect(savedData[0].text).toBe('Active task');
    });
  });
});
