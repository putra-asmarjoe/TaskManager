const BASE_URL = process.env.REACT_APP_API_URL;;
console.log('BASE_URL:', process.env.REACT_APP_API_URL); // Tambahkan ini untuk debugging

const getToken = () => {
  return localStorage.getItem('token');
};

export const validateToken = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return false;
  }

  const response = await fetch(`${BASE_URL}/validate-token`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  return response.status === 200;
};

export const setAuthToken = async (username, password) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();
  if (data.access_token) {
    localStorage.setItem('token', data.access_token); // Save token
    localStorage.setItem('username', data.username); // Save username
    localStorage.setItem('userrole', data.userrole); // Save user role
  }

  return data;
};
 
 
 const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    console.error('Errorxxx:', data);
    throw new Error(data.msg || 'Something went wrong');
  }
  return data;
};

export const getTasks = async () => { 
  const token = getToken();
  const response = await fetch(BASE_URL+'/tasks', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return handleResponse(response);
};

export const createTask = async (task) => {
  const token = getToken();
  const response = await fetch(BASE_URL+'/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(task),
  });
  return handleResponse(response);
};

export const updateTask = async (task) => {
  const token = getToken();
  const response = await fetch(`${BASE_URL}/tasks/${task.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(task),
  });
  return handleResponse(response);
};

export const deleteTask = async (taskId) => {
  const token = getToken();
  const response = await fetch(`${BASE_URL}/tasks/${taskId}`, {
    method: 'DELETE',    
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  return handleResponse(response);
};
