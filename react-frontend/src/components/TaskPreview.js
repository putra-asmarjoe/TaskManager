import React, { useState, useEffect } from 'react';
import { PaperClipIcon } from '@heroicons/react/20/solid'
const TaskPreview = ({ onClose, task }) => {
   
    const taskHistory = JSON.parse(task.task_history);
  const getStatusBadgeClass = (status_id) => {
    switch (status_id) {
      case 0:
        return 'bg-gray-200 text-gray-800';
      case 100:
        return 'bg-yellow-200 text-yellow-800';
      case 200:
        return 'bg-green-200 text-green-800';
      default:
        return 'bg-red-200 text-red-800';
    }
  };
  return (
        <div>
      <div className="py-4 px-4 sm:px-0">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
        Details Task #{task.id}
      </h3>
      </div>
      <div className="border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Title</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{task.title}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Description</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
             {task.description}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Status</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            <span className={`px-2 py-1 rounded ${getStatusBadgeClass(task.status_id)}`}>
                  {task.status}
            </span>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Created by</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{task.created_by}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Date added</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{new Date(task.created_at).toLocaleString()}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">History</dt>
            <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
              
              {taskHistory.map((history, index) => (
                  <li className=" items-center py-4 pl-4 pr-5 text-sm leading-6" key={index}>
                  
                    <p><strong>{history.name}</strong> - {new Date(history.datetime).toLocaleString()}</p>
                    
                    <p>{history.message}</p>
                  </li>
                ))}
                
              </ul>
            </dd>
          </div>
        </dl>
      </div>
      
      <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
        
        <button type="button" className="float-right py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white hover:rounded-3xl rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-white-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default TaskPreview;
