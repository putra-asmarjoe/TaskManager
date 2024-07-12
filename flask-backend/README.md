#Task Manager API Documentation
## Overview
The Task Manager API is a RESTful API that allows users to register, login, and manage tasks.
 
## Create New User
- Endpoint: http://127.0.0.1:5000/register
- Method: POST
- Headers:

'Content-Type': 'application/json'

- **Parameters**:
```json
{
  "username": "joe",
  "email": "joe@taskmanager.com",
  "password": "Password123",
  "userrole": "admin"
}
```

- **Response**:
```json
{
  "message": "User registered successfully"
}
```

- Sample Request:
```bash
curl -X POST http://127.0.0.1:5000/register \
-H "Content-Type: application/json" \
-d '{
  "username": "joe",
  "email": "joe@taskmanager.com",
  "password": "Password123",
  "userrole": "admin"
}'
```

## API to Login
- Endpoint: http://127.0.0.1:5000/login
- Method: POST
- Headers:

'Content-Type': 'application/json'

- **Parameters**:

{
  "username": "joe",
  "password": "Password123"
}

- **Response**:
```json
{
  "access_token": "jwttoken",
  "username": "joe",
  "userrole": "admin"
}
```

- Sample Request:
```bash
curl -X POST http://127.0.0.1:5000/login \
-H "Content-Type: application/json" \
-d '{
  "username": "joe",
  "password": "Password123"
}'
```


## API to Validate JWT Token
- Endpoint: http://127.0.0.1:5000/validate-token
- Method: POST
- Headers:

'Authorization': 'Bearer jwttoken',
'Content-Type': 'application/json'

- **Response**:
```json
{
  "msg": "Token is valid"
}
```

- Sample Request:
```bash
curl -X POST http://127.0.0.1:5000/validate-token \
-H "Authorization: Bearer <jwttoken>" \
-H "Content-Type: application/json"
```


## API to Get List of Tasks
- Endpoint: http://127.0.0.1:5000/tasks
- Method: GET
- Headers:

'Authorization': 'Bearer jwttoken'

- **Response**:
```json
[
  {
    "created_at": "2024-07-12 18:53:43",
    "created_by": "joe",
    "created_by_id": 1,
    "description": "Setup Server",
    "id": 1,
    "status": "Pending",
    "status_id": 100,
    "task_history": "[]",
    "title": "Task 1"
  },
  {
    "created_at": "2024-07-12 18:53:50",
    "created_by": "joe",
    "created_by_id": 1,
    "description": "Install Backend App",
    "id": 2,
    "status": "Pending",
    "status_id": 0,
    "task_history": "[]",
    "title": "Task 2"
  }
]
```

- Sample Request:
```bash
curl -X GET http://127.0.0.1:5000/tasks \
-H "Authorization: Bearer <jwttoken>"
```


## API to Create New Task
- Endpoint: http://127.0.0.1:5000/tasks
- Method: POST
- Headers:

'Authorization': 'Bearer jwttoken',
'Content-Type': 'application/json'

- **Parameters**:
```json
{
  "title": "Task 3",
  "description": "Install Frontend App.",
  "status_id": 0
}
```

- **Response**:
```json
{
  "created_at": "2024-07-12 19:28:04",
  "created_by": "joe",
  "created_by_id": 2,
  "description": "Install Frontend App.",
  "id": 3,
  "status": "Pending",
  "status_id": 0,
  "task_history": "[{\"id\": 2, \"name\": \"joe\", \"message\": \"Task created\", \"datetime\": \"2024-07-12T19:28:04.135253\"}]",
  "title": "Task 3"
}
```

- Sample Request:
```bash
curl -X POST http://127.0.0.1:5000/tasks \
-H "Authorization: Bearer <jwttoken>" \
-H "Content-Type: application/json" \
-d '{
  "title": "Task 3",
  "description": "Install Frontend App.",
  "status_id": 0
}'
```

## API to Update Task by Task ID
- Endpoint: http://127.0.0.1:5000/tasks/3
- Method: PUT
- Headers:

'Authorization': 'Bearer jwttoken',
'Content-Type': 'application/json'

- **Parameters**:
```json
{
  "title": "Complete Project Proposal 1",
  "status_id": 100,
  "description": "Install Frontend App.",
  "id": 3
}
```

- **Response**:

```json
{
  "description": "Install Frontend App.",
  "id": 3,
  "status_id": 100,
  "title": "Complete Project Proposal 1"
}
```

- Sample Request:
```bash
curl -X PUT http://127.0.0.1:5000/tasks/3 \
-H "Authorization: Bearer <jwttoken>" \
-H "Content-Type: application/json" \
-d '{
  "title": "Complete Project Proposal 1",
  "status_id": 100,
  "description": "Install Frontend App.",
  "id": 3
}'
```

## API to Delete Task by Task ID 
- Endpoint: http://127.0.0.1:5000/tasks/3
- Method: DELETE
- Headers:

'Authorization': 'Bearer jwttoken'

- Response:
```json
{
  "message": "Task deleted"
}
```
- Sample Request:
```bash
curl -X DELETE http://127.0.0.1:5000/tasks/3 \
-H "Authorization: Bearer <jwttoken>"
```