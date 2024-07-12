# Task Management Application

## Overview

This project is a task management application that allows users to create, read, update, and delete (CRUD) tasks. Each task includes a title, description, and status (e.g., pending, in progress, completed). The application is built with a React frontend and a Flask backend, ensuring a responsive and secure user experience.

## Features

### Frontend (React)
- **TaskList**: Displays a list of tasks.
- **TaskForm**: A form for creating and editing tasks.
- **TaskItem**: Displays a single task with options to edit or delete it.

### Backend (Flask)
- **GET /tasks**: Retrieve all tasks.
- **POST /tasks**: Create a new task.
- **PUT /tasks/<id>**: Update an existing task.
- **DELETE /tasks/<id>**: Delete a task.

## Technologies Used

### Frontend
- React
- React Router
- Axios
- Tailwind CSS (optional)

### Backend
- Python
- Flask
- SQLite or PostgreSQL
- SQLAlchemy (optional)
- Flask-JWT-Extended (for authentication)

## Setup Instructions

### Prerequisites
- Node.js (v14 or later)
- Python (v3.7 or later)
- SQLite or PostgreSQL

### Backend Setup

1. Navigate to the backend directory:
    ```bash
    cd TaskManager/flask-backend
    ```

2. Create a virtual environment and activate it:
    ```bash
    python3 -m venv venv
    source venv/bin/activate   # On Windows, use `venv\Scripts\activate`
    ```

3. Install dependencies:
    ```bash
    pip3 install -r requirements.txt
    ```

4. Create a `.env` file in the `backend` directory and add the following:
    ```bash
    touch .env
    ```
    ```env
    SECRET_KEY=Qyu5y3W2jI6aJO2FIb2D92r5QBXZMsM1xeIeVJo8GA8qJOg7KTjWJurAtph7nUVY
    JWT_SECRET_KEY=R5fDijg6iXz2eiaMn4AY4XuNoHxXrJy2XI2B9APZ4m5u0v42p41QTJY39fzIxLZf
    JWT_ACCESS_TOKEN_EXPIRES=3600
    #Uncomment this part if you want to use postgresql
    #DATABASE_URL=postgresql://postgres:mysecretpassword@localhost/myflaskdb
    ```

5. Initialize the database:
    ```bash
    flask db init
    flask db migrate
    flask db upgrade
    ```

6. Start the Flask server:
    ```bash
    flask run
    ```


### Frontend Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/putra-asmarjoe/TaskManager.git
    cd ../react-frontend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the `react-frontend` directory and add the following:
    ```env
    REACT_APP_API_URL=http://localhost:5000/
    ```

4. Start the React application:
    ```bash
    npm start
    ```
    
### Usage

Once both the frontend and backend servers are running, you can access the application at `http://localhost:3000`.

## Performance Optimization

### Frontend
- Implement lazy loading for components where applicable.
- Optimize the application to minimize re-renders and enhance performance.
- Use code splitting to reduce the initial load time.

### Backend
- Implement efficient database queries to ensure fast response times.
- Use indexing where necessary to improve database performance.

## Security

### Frontend
- Implement form validation to prevent XSS attacks.
- Use environment variables to securely manage sensitive data.

### Backend
- Implement input validation to prevent SQL injection and other attacks.
- Use environment variables to securely manage sensitive data.
- Implement authentication and authorization using JWT.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
