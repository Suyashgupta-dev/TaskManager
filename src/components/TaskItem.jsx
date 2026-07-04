import React from 'react';

const TaskItem = ({ task, onToggle, onDelete }) => {
  return (
    <div className={`flex items-center justify-between p-3 mb-2 border rounded-lg shadow-sm transition-all ${task.completed ? 'bg-gray-100' : 'bg-white'}`}>
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
        <span className={`${task.completed ? 'line-through text-gray-500' : 'text-gray-800'} font-medium`}>
          {task.text}
        </span>
      </div>
      <button
        onClick={() => onDelete(task.id)}
        className="px-3 py-1 text-sm font-medium text-red-600 hover:text-white hover:bg-red-600 border border-red-600 rounded-md transition-colors"
      >
        Delete
      </button>
    </div>
  );
};

export default TaskItem;
