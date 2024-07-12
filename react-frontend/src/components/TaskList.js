import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onPreview, onDelete, onUpdate }) => {
  return (
    <div>
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-4 py-4">#</th>
                            <th scope="col" class="px-4 py-3">Title</th>
                            <th scope="col" class="px-4 py-3">Description</th>
                            <th scope="col" class="px-4 py-3">Status</th>
                            <th scope="col" class="px-4 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                      {tasks.map((task) => (
                        <TaskItem key={task.id} task={task} onPreview={onPreview} onUpdate={onUpdate} onDelete={onDelete}/>
                      ))}
                    </tbody>
                </table>
    </div>
  );
};

export default TaskList;
