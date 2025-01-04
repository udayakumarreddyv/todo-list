import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoItem from '../TodoItem';

describe('TodoItem component', () => {
  const mockTodo = {
    id: 1,
    text: 'Test Todo',
    completed: false,
    createdAt: new Date().toISOString()
  };
  
  const mockCompletedTodo = {
    ...mockTodo,
    completed: true
  };

  const mockFunctions = {
    onToggle: vi.fn(),
    onDelete: vi.fn(),
    onEdit: vi.fn()
  };

  it('renders todo item correctly', () => {
    render(<TodoItem todo={mockTodo} {...mockFunctions} />);
    
    // Check if todo text is displayed
    expect(screen.getByText('Test Todo')).toBeInTheDocument();
    
    // Check if toggle button exists and is not marked as completed
    const toggleBtn = screen.getByRole('button', { name: /mark as complete/i });
    expect(toggleBtn).toBeInTheDocument();
    expect(toggleBtn).not.toHaveClass('checked');
  });

  it('renders completed todo with appropriate styling', () => {
    render(<TodoItem todo={mockCompletedTodo} {...mockFunctions} />);
    
    // Check if todo item has completed class
    const todoItem = screen.getByText('Test Todo').closest('.todo-item');
    expect(todoItem).toHaveClass('completed');
    
    // Check if toggle button is marked as completed
    const toggleBtn = screen.getByRole('button', { name: /mark as incomplete/i });
    expect(toggleBtn).toHaveClass('checked');
  });

  it('calls onToggle when toggle button is clicked', async () => {
    render(<TodoItem todo={mockTodo} {...mockFunctions} />);
    
    const toggleBtn = screen.getByRole('button', { name: /mark as complete/i });
    await userEvent.click(toggleBtn);
    
    expect(mockFunctions.onToggle).toHaveBeenCalledTimes(1);
  });

  it('calls onDelete when delete button is clicked', async () => {
    render(<TodoItem todo={mockTodo} {...mockFunctions} />);
    
    const deleteBtn = screen.getByRole('button', { name: /delete todo/i });
    await userEvent.click(deleteBtn);
    
    expect(mockFunctions.onDelete).toHaveBeenCalledTimes(1);
  });

  it('enters edit mode when edit button is clicked', async () => {
    render(<TodoItem todo={mockTodo} {...mockFunctions} />);
    
    const editBtn = screen.getByRole('button', { name: /edit todo/i });
    await userEvent.click(editBtn);
    
    // Check if edit form is displayed
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
  });

  it('calls onEdit with new text when edit form is submitted', async () => {
    render(<TodoItem todo={mockTodo} {...mockFunctions} />);
    
    // Enter edit mode
    const editBtn = screen.getByRole('button', { name: /edit todo/i });
    await userEvent.click(editBtn);
    
    // Edit the text
    const editInput = screen.getByRole('textbox');
    await userEvent.clear(editInput);
    await userEvent.type(editInput, 'Updated Todo');
    
    // Submit the form
    const saveBtn = screen.getByRole('button', { name: /save/i });
    await userEvent.click(saveBtn);
    
    expect(mockFunctions.onEdit).toHaveBeenCalledWith('Updated Todo');
  });

  it('cancels editing when cancel button is clicked', async () => {
    render(<TodoItem todo={mockTodo} {...mockFunctions} />);
    
    // Enter edit mode
    const editBtn = screen.getByRole('button', { name: /edit todo/i });
    await userEvent.click(editBtn);
    
    // Edit the text
    const editInput = screen.getByRole('textbox');
    await userEvent.clear(editInput);
    await userEvent.type(editInput, 'Updated Todo');
    
    // Cancel editing
    const cancelBtn = screen.getByRole('button', { name: /cancel/i });
    await userEvent.click(cancelBtn);
    
    // Check if we're back to view mode with original text
    expect(screen.getByText('Test Todo')).toBeInTheDocument();
    expect(mockFunctions.onEdit).not.toHaveBeenCalled();
  });
});
