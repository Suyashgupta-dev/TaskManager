import React, { useReducer, useEffect, useRef, useState } from 'react';
import TaskList from './components/TaskList';

// Reducer function to manage task state
const taskReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return [...state, action.payload];
    case 'TOGGLE_TASK':
      return state.map((task) =>
        task.id === action.payload ? { ...task, completed: !task.completed } : task
      );
    case 'DELETE_TASK':
      return state.filter((task) => task.id !== action.payload);
    default:
      return state;
  }
};

const App = () => {
  // 1. Task state managed with useReducer - initialized from localStorage
  const [tasks, dispatch] = useReducer(taskReducer, [], () => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [inputText, setInputText] = useState('');
  
  // 2. useRef for auto-focus and render count
  const inputRef = useRef(null);
  const renderCount = useRef(0);
  
  // Increment render count on every render
  renderCount.current += 1;

  // 3. useEffect to focus input on mount
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // 4. useEffect for LocalStorage (Saving)
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Handler functions
  const handleAddTask = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newTask = {
      id: Date.now(),
      text: inputText,
      completed: false,
    };

    dispatch({ type: 'ADD_TASK', payload: newTask });
    setInputText('');
  };

  const toggleTask = (id) => {
    dispatch({ type: 'TOGGLE_TASK', payload: id });
  };

  const deleteTask = (id) => {
    dispatch({ type: 'DELETE_TASK', payload: id });
  };

  // 6. Summary derived from state
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden md:max-w-2xl border border-gray-100">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-indigo-600">Task Master</h1>
            <span className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-2.5 py-0.5 rounded">
              Renders: {renderCount.current}
            </span>
          </div>

          <form onSubmit={handleAddTask} className="flex gap-2 mb-8">
            <input
              ref={inputRef}
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="What needs to be done?"
              className="flex-1 min-w-0 block w-full px-4 py-3 rounded-lg border-gray-300 border focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all shadow-sm"
            />
            <button
              type="submit"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              Add
            </button>
          </form>

          {/* Summary Section */}
          <div className="flex gap-4 mb-6">
            <div className="flex-1 bg-indigo-50 p-4 rounded-lg text-center">
              <p className="text-indigo-600 text-sm font-semibold uppercase tracking-wider">Total</p>
              <p className="text-2xl font-bold text-indigo-900">{totalTasks}</p>
            </div>
            <div className="flex-1 bg-green-50 p-4 rounded-lg text-center">
              <p className="text-green-600 text-sm font-semibold uppercase tracking-wider">Done</p>
              <p className="text-2xl font-bold text-green-900">{completedTasks}</p>
            </div>
          </div>

          <hr className="my-6 border-gray-100" />

          {/* Task List Component */}
          <TaskList 
            tasks={tasks} 
            onToggle={toggleTask} 
            onDelete={deleteTask} 
          />
        </div>
      </div>
      
      <p className="text-center text-gray-400 mt-8 text-sm">
        Built with React hooks: useReducer, useEffect, useRef
      </p>
    </div>
  );
};

export default App;
