import React, { useState, useEffect } from 'react';
import TaskList from '../components/TaskList';
import ModalAdd from '../components/Modal';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';
import TaskForm from '../components/TaskForm';
import TaskPreview from '../components/TaskPreview';
import { useNavigate } from 'react-router-dom';
import { validateToken, getTasks, createTask, updateTask, deleteTask } from '../services/taskService';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton} from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

const Dashboard = () => {

  const [tasks, setTasks] = useState([]);
  const [singleTask, setSingleTask] = useState({});
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [username, setUsername] = useState('');
  const [userrole, setUserRole] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalPrevVisible, setModalPrevVisible] = useState(false);
  const [isModalEditVisible, setModalEditVisible] = useState(false);
  const [isModalConfirmVisible, setisModalConfirmVisible] = useState(false)   
  const [taskToDelete, setTaskToDelete] = useState(null);
  const navigation = [
    { name: 'Dashboard', href: '#', current: true },
  ]

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  const navigate = useNavigate();

  useEffect(() => {
    const checkTokenValidity = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await validateToken(); 

        if (!response) {
          throw new Error('Token is not valid');
        }
        
        
        
        setUsername(localStorage.getItem('username'));
        setUserRole(localStorage.getItem('userrole'));
        
      } catch (err) {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('userrole');
        navigate('/login');
      }
    };

    checkTokenValidity();
  }, [navigate]);
  useEffect(() => {
    fetchTasks();
  }, []);
  
  useEffect(() => {
    let timer;
    if (error || info) {
      timer = setTimeout(() => {
        setError('');
        setInfo('');
      }, 10000); // 10 detik
    }
    return () => clearTimeout(timer);
  }, [error, info]);
  
  const fetchTasks = async () => {
    try {
        const data = await getTasks();
        setTasks(data);
      } catch (error) {
        setError(error.message);
      }
  };
  
  
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  
  const handleAddTask = async (taskData) => {
    try {
        const newTask = await createTask(taskData);
        setTasks([...tasks, newTask]);
        setModalVisible(false); 
        setInfo('New task has been added.');
      } catch (error) {
        setError(error.message);
      }
    
  }; 

  const handlePreviewTask = async (taskData) => {
    setSingleTask(taskData);
    setModalPrevVisible(true);    
  };

  const handleEditTask = async (taskData) => {
   
    setSingleTask(taskData);
    setModalEditVisible(true);
    
  };

  const handleUpdateTask = async (taskData) => {
    const taskid = singleTask.id;
    const updatedTask = { ...taskData, id: taskid }; 
    setModalEditVisible(false);
    
    
    try {
        await updateTask(updatedTask);
        fetchTasks();        
        setInfo(`Task #${taskid} has been updated.`);
      } catch (error) {
        setError(error.message);
      }
    
  };
  
  
  const handleDeleteTask = async (taskId) => { 
    setisModalConfirmVisible(true)    
    setTaskToDelete(taskId); 
  };

  const confirmDeleteTask = async () => { 
    setisModalConfirmVisible(false) 
    
    try {
        await deleteTask(taskToDelete);
        fetchTasks();        
        setInfo(`Task #${taskToDelete} has been deleted.`);
      } catch (error) {
        setError(error.message);
      }
    
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userrole');
    navigate('/login');
  };

  return (
    <div className="App">
        <Disclosure as="nav" className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
           
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? 'page' : undefined}
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'rounded-md px-3 py-2 text-sm font-medium',
                    )}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <a href="#" className="block px-4 py-2 text-sm text-white data-[focus]:bg-gray-100" >
          {capitalizeFirstLetter(username)} [{capitalizeFirstLetter(userrole)}]
           </a>
            

            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <button  onClick={handleLogout} title="Logout" className="hover:rounded-3xl hover:bg-red-800">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Logout</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6  text-white">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9" />
                    </svg>

                  </button>
                </MenuButton>
              </div>
            </Menu>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? 'page' : undefined}
              className={classNames(
                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium',
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
<section class="mt-5">
<div class="mx-auto max-w-screen-xl px-4 lg:px-12"> 
        <div class="relative shadow-md sm:rounded-lg overflow-hidden">
      </div>
      </div>


    <div class="mx-auto max-w-screen-xl px-4 lg:px-12"> 
        <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden"> 
        
            <div class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
            <h1 className="text-3xl font-bold font-11 overflow-x-auto">
            Task Manager
            </h1>
            <div class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
           
            
            <button class="flex p-2.5 bg-green-500 rounded-xl hover:rounded-3xl hover:bg-green-600 transition-all duration-300 text-white" onClick={() => setModalVisible(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Add Task
            </button>
        </div>
        
     
      <ModalAdd isVisible={isModalPrevVisible}> 
        <TaskPreview onClose={() => setModalPrevVisible(false)} task={singleTask} />
      </ModalAdd>   
      
      <ModalAdd isVisible={isModalVisible}> 
        <TaskForm onSave={handleAddTask} onClose={() => setModalVisible(false)} />
      </ModalAdd>      
      
      <ModalAdd isVisible={isModalEditVisible}> 
        <TaskForm onSave={handleUpdateTask} onClose={() => setModalEditVisible(false)} task={singleTask} />
      </ModalAdd>
      
        <ConfirmDeleteModal
                isVisible={isModalConfirmVisible}
                onRequestClose={() => setisModalConfirmVisible(false)}
                onConfirm={confirmDeleteTask}
                taskid={taskToDelete}
              />
              
      </div>
            
            
            
      <div class="overflow-x-auto mb-2">
        {info && (
        <div class="mt-10 mx-3 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mx-auto max-w-screen-xl px-4 lg:px-12" role="alert">
        <strong class="font-bold">Good! </strong>
        <span class="block sm:inline"> {info}</span>
      </div>
      )}
        {error && (
        <div class="mt-10 bg-red-100 border border-red-400 text-red-700 px-4 mx-10 py-3 rounded relative mx-auto max-w-screen-xl px-4 lg:px-12" role="alert">
        <strong class="font-bold">Opss! </strong>
        <span class="block sm:inline"> {error}</span>
      </div>
      )}
        
        </div>
            
            <div class="overflow-x-auto">
            <TaskList tasks={tasks} onPreview={handlePreviewTask} onUpdate={handleEditTask} onDelete={handleDeleteTask}  />
            </div>
            <nav class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
                
            </nav>
        </div>
    </div>
    
    
    
</section>
    

    </div>
  );
};

export default Dashboard;
