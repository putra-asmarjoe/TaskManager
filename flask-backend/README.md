Task Manager API Documentation
Overview
The Task Manager API is a RESTful API that allows users to register, login, and manage tasks.

Authentication
To use the API, you need to register a new user and obtain an access token. You can then use this token to authenticate your requests.

Register User
Endpoint: http://127.0.0.1:5000/register
Method: POST
Headers: Content-Type: application/json
Parameters: username, email, password, and userrole
Response: {"message": "User registered successfully"}
Login
Endpoint: http://127.0.0.1:5000/login
Method: POST
Headers: Content-Type: application/json
Parameters: username and password
Response: {"access_token": "jwttoken", "username": "joe", "userrole": "admin"}
Validate JWT Token
Endpoint: http://127.0.0.1:5000/validate-token
Method: POST
Headers: Authorization: Bearer <jwttoken> and Content-Type: application/json
Response: {"msg": "Token is valid"}
Task Management
Get List of Tasks
Endpoint: http://127.0.0.1:5000/tasks
Method: GET
Headers: Authorization: Bearer <jwttoken>
Response: [Task objects]
Create New Task
Endpoint: http://127.0.0.1:5000/tasks
Method: POST
Headers: Authorization: Bearer <jwttoken> and Content-Type: application/json
Parameters: title, description, and status_id
Response: Task object
Update Task by Task ID
Endpoint: http://127.0.0.1:5000/tasks/<task_id>
Method: PUT
Headers: Authorization: Bearer <jwttoken> and Content-Type: application/json
Parameters: <task_id>, and any of the task properties (e.g., title, status_id, description)
Response: The updated task object
Delete Task by Task ID
Endpoint: http://127.0.0.1:5000/tasks/<task_id>
Method: DELETE
Headers: Authorization: Bearer <jwttoken>
Response: { "message": "Task deleted" }
Note that you should replace <task_id> with the actual task ID in the URL path.