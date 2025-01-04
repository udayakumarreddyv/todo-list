# Todo List Application

A modern, responsive todo list application built with React.js and Vite. This application helps you stay organized and manage your daily tasks efficiently.

## Features

- ✨ **Modern UI**: Clean and intuitive user interface with a beautiful gradient background
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- ✅ **Task Management**: Add, edit, delete, and mark tasks as complete
- 💾 **Local Storage**: Automatically saves your todos locally - no data loss!
- 📊 **Statistics**: View total, active, and completed task counts
- 🗑️ **Bulk Actions**: Clear all completed tasks at once
- ♿ **Accessible**: Built with accessibility best practices

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd todo-list
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

- **Add a Todo**: Type your task in the input field and press Enter or click the "+" button
- **Mark as Complete**: Click the circle next to any task to toggle completion
- **Edit a Todo**: Double-click on any task text or click the edit icon
- **Delete a Todo**: Click the "×" button next to any task
- **Clear Completed**: Use the "Clear Completed" button to remove all finished tasks

## Project Structure

```
src/
├── components/          # React components
│   ├── AddTodo.jsx     # Component for adding new todos
│   ├── TodoList.jsx    # Container component for todo items
│   ├── TodoItem.jsx    # Individual todo item component
│   ├── *.css           # Component-specific styles
│   └── __tests__/      # Component unit tests
│       ├── AddTodo.test.jsx
│       ├── TodoList.test.jsx
│       └── TodoItem.test.jsx
├── hooks/              # Custom React hooks (for future enhancements)
├── test/               # Test configuration and integration tests
│   ├── setup.js        # Test setup and configuration
│   └── App.test.jsx    # App component integration tests
├── utils/              # Utility functions (for future enhancements)
├── App.jsx             # Main application component
├── App.css             # Main application styles
├── index.css           # Global styles
└── main.jsx            # Application entry point
```

## Technologies Used

- **React 18**: Modern React with functional components and hooks
- **Vite**: Fast build tool and development server
- **CSS3**: Modern CSS with Flexbox and Grid
- **Local Storage API**: For data persistence
- **Vitest**: Unit testing framework for Vite projects
- **React Testing Library**: Testing utilities for React components
- **Jest DOM**: Custom DOM element matchers for tests

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the app for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality
- `npm test` - Run unit tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Generate test coverage report

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Testing

This project includes a comprehensive test suite built with Vitest and React Testing Library:

### Unit Tests

- **Component Tests**: Each React component has its own test suite:
  - `TodoItem.test.jsx`: Tests for rendering, toggling, editing, and deleting todos
  - `AddTodo.test.jsx`: Tests for input validation, form submission, and event handling
  - `TodoList.test.jsx`: Tests for rendering lists and handling todo operations

### Integration Tests

- **App Integration Tests**: Tests for the entire application flow:
  - Local storage persistence
  - Adding, editing, toggling, and deleting todos
  - Statistics display and updates
  - Clear completed functionality

### Running Tests

```bash
# Run all tests once
npm test

# Run tests in watch mode
npm run test:watch

# Generate test coverage report
npm run test:coverage
```

## Future Enhancements

- [ ] Drag and drop reordering
- [ ] Categories/tags for todos
- [ ] Due dates and reminders
- [ ] Dark/light theme toggle
- [ ] Export/import functionality
- [ ] Cloud synchronization
- [ ] Improve test coverage to 100%+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
