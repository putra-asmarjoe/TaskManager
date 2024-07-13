CREATE TABLE userapi (
    id SERIAL PRIMARY KEY,
    username VARCHAR(25) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(200) NOT NULL,
    user_role VARCHAR(5) NOT NULL DEFAULT 'user',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE task (
    id SERIAL PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    status_id INTEGER NOT NULL DEFAULT 0, 
    status VARCHAR(20) NOT NULL DEFAULT 'pending',
    task_history TEXT NOT NULL,
    created_by_id INTEGER NOT NULL,
    created_by VARCHAR(25) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by_id) REFERENCES userapi(id) 
);

