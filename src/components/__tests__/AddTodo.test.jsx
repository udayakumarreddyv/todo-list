import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddTodo from '../AddTodo';

describe('AddTodo component', () => {
  const mockAddTodo = vi.fn();
  
  beforeEach(() => {
    mockAddTodo.mockClear();
  });

  it('renders input and add button correctly', () => {
    render(<AddTodo onAddTodo={mockAddTodo} />);
    
    // Check if input field exists
    expect(screen.getByPlaceholderText('What needs to be done?')).toBeInTheDocument();
    
    // Check if add button exists and is disabled initially
    const addButton = screen.getByRole('button', { name: /add todo/i });
    expect(addButton).toBeInTheDocument();
    expect(addButton).toBeDisabled();
  });

  it('enables add button when input has text', async () => {
    render(<AddTodo onAddTodo={mockAddTodo} />);
    
    const input = screen.getByPlaceholderText('What needs to be done?');
    const addButton = screen.getByRole('button', { name: /add todo/i });
    
    // Initial state - button should be disabled
    expect(addButton).toBeDisabled();
    
    // Type in the input
    await userEvent.type(input, 'New Todo');
    
    // Button should now be enabled
    expect(addButton).not.toBeDisabled();
  });

  it('calls onAddTodo when form is submitted with text', async () => {
    render(<AddTodo onAddTodo={mockAddTodo} />);
    
    const input = screen.getByPlaceholderText('What needs to be done?');
    const addButton = screen.getByRole('button', { name: /add todo/i });
    
    // Type in the input
    await userEvent.type(input, 'New Todo');
    
    // Submit the form
    await userEvent.click(addButton);
    
    // Check if onAddTodo was called with the correct text
    expect(mockAddTodo).toHaveBeenCalledWith('New Todo');
    
    // Input should be cleared after submission
    expect(input).toHaveValue('');
  });

  it('calls onAddTodo when Enter key is pressed', async () => {
    render(<AddTodo onAddTodo={mockAddTodo} />);
    
    const input = screen.getByPlaceholderText('What needs to be done?');
    
    // Type in the input and press Enter
    await userEvent.type(input, 'New Todo{enter}');
    
    // Check if onAddTodo was called with the correct text
    expect(mockAddTodo).toHaveBeenCalledWith('New Todo');
    
    // Input should be cleared after submission
    expect(input).toHaveValue('');
  });

  it('does not call onAddTodo when form is submitted with empty text', async () => {
    render(<AddTodo onAddTodo={mockAddTodo} />);
    
    const addButton = screen.getByRole('button', { name: /add todo/i });
    
    // Try to submit the form with empty input
    await userEvent.click(addButton);
    
    // onAddTodo should not be called
    expect(mockAddTodo).not.toHaveBeenCalled();
  });

  it('trims whitespace from input before submission', async () => {
    render(<AddTodo onAddTodo={mockAddTodo} />);
    
    const input = screen.getByPlaceholderText('What needs to be done?');
    
    // Type in the input with whitespace
    await userEvent.type(input, '  New Todo  ');
    
    // Submit the form
    await userEvent.click(screen.getByRole('button', { name: /add todo/i }));
    
    // Check if onAddTodo was called with trimmed text
    expect(mockAddTodo).toHaveBeenCalledWith('New Todo');
  });
});
