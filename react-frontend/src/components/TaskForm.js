import React, { useState, useEffect } from 'react';

const TaskForm = ({ onSave, onClose, task }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [statusID, setStatusID] = useState('0');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setStatusID(task.status_id);
    } else {
      setTitle('');
      setDescription('');
      setStatusID('0');
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ title, description, status_id: statusID });
    setTitle('');
    setDescription('');
    setStatusID('0');
  };

  return (
    <>    
    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
        {task ? `Edit Task #${task.id}` : 'Create New Task'}
      </h3>
      <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={onClose}>
        {/* SVG for close button */}
      </button>
    </div>
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="p-4 md:p-5 space-y-4">
        <div>
          <label className="block text-sm font-bold mb-2">Title</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-md"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-bold mb-2">Description</label>
          <textarea
            className="w-full px-3 py-2 border rounded-md"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-bold mb-2">Status</label>
          <select
            className="w-full px-3 py-2 border rounded-md"
            value={statusID}
            onChange={(e) => setStatusID(e.target.value)}
          >
            <option value="0">Pending</option>
            <option value="100">In Progress</option>
            <option value="200">Completed</option>
          </select>
        </div>
      </div>
      <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
        <button type="submit" className="text-white bg-green-700 hover:rounded-3xl hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Save
        </button>
        <button type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white hover:rounded-3xl rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-white-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
    </>
  );
};

export default TaskForm;
