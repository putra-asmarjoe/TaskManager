import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DOMPurify from "isomorphic-dompurify";
import { setAuthToken }from '../services/taskService';

const Login = () => {
    
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userrole');

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Sanitasi input untuk mencegah XSS
        const sanitizedUsername = DOMPurify.sanitize(username);
        const sanitizedPassword = DOMPurify.sanitize(password);
    
        try {
          const data = await setAuthToken(sanitizedUsername, sanitizedPassword);
    
          // Cek jika login berhasil
          if (data.access_token) {
            navigate('/dashboard'); // Arahkan ke dashboard jika berhasil login
          } else {
            setError('Login failed. Please check your credentials.');
          }
        } catch (err) {
          setError('An error occurred during login. Please try again.');
        }
    };

  return (
    <section class="bg-gray-50 dark:bg-gray-900">
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <button class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 w-8 h-8 mr-2 text-blue-700">
              <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
            </svg>
          Task Manager v.1.0    
      </button>
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign in to your account
              </h1>
              <form class="space-y-4 md:space-y-6"  onSubmit={handleSubmit}>
              {error && (
              
              <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong class="font-bold">Ops..! </strong>
              <span class="block sm:inline"> {error}</span>
            </div>
                  )}
                    <div>
                      <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                      <input type="text" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                      
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} required=""/>
                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)} required=""/>
                  </div>
                  <button type="submit" class=" bg-blue-500 rounded-xl hover:rounded-3xl hover:bg-blue-600 w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                  
              </form>
          </div>
      </div>
  </div>
</section>
  );
};

export default Login;
