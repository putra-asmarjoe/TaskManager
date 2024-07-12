from flask import request, jsonify, current_app, abort
from app import app, db, limiter
from models import User, Task
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from datetime import datetime
from marshmallow import Schema, fields, validates, validate, ValidationError
import json


status_map = {
    0: 'Pending',
    100: 'In Progress',
    200: 'Completed'
}


class BaseSchema(Schema):
    id = fields.Integer(required=False)
    title = fields.String(required=False, validate=validate.Length(max=50))
    status_id = fields.Integer(required=False)
    description = fields.String(required=False, validate=validate.Length(max=200))
    
    @validates('status_id')
    def validate_status_id(self, value):
        if value not in status_map:
            raise ValidationError("Invalid status_id.")
            
class CreateTaskSchema(BaseSchema):
    title = fields.String(required=True, validate=validate.Length(max=50))
    status_id = fields.Integer(required=True)
    description = fields.String(required=True, validate=validate.Length(max=200))
    
class UpdateTaskSchema(BaseSchema):    
    id = fields.Integer(required=True)
    title = fields.String(required=False, validate=validate.Length(max=50))
    status_id = fields.Integer(required=False)
    description = fields.String(required=False, validate=validate.Length(max=200))
    
def update_task_history(task, user_id, username, changes):
    history_entry = {
        "id": user_id,
        "name": username,
        "message": changes,
        "datetime": datetime.utcnow().isoformat()
    }

    if task.task_history:
        task_history = json.loads(task.task_history)
    else:
        task_history = []

    task_history.append(history_entry)
    task.task_history = json.dumps(task_history)
    
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if not data or not data.get('username') or not data.get('email') or not data.get('password'):
        current_app.logger.warning('Registration failed: Missing fields')
        return jsonify({'message': 'Missing fields'}), 400

    if User.query.filter_by(username=data['username']).first() or User.query.filter_by(email=data['email']).first():
        current_app.logger.warning('Registration failed: User already exists')
        return jsonify({'message': 'User already exists'}), 409

    new_user = User(username=data['username'], email=data['email'], userrole=data['userrole'])
    new_user.set_password(data['password'])
    db.session.add(new_user)
    db.session.commit()

    current_app.logger.info('User registered successfully: %s', data['username'])
    return jsonify({'message': 'User registered successfully'}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data or not data.get('username') or not data.get('password'):
        current_app.logger.warning('Login failed: Missing fields')
        return jsonify({'message': 'Missing fields'}), 400

    user = User.query.filter_by(username=data['username']).first()
    if user and user.check_password(data['password']):
        access_token = create_access_token(identity={'id': user.id, 'username': user.username, 'userrole': user.userrole})
        current_app.logger.info('User logged in successfully: %s', data['username'])
        return jsonify({'access_token': access_token, 'username': user.username, 'userrole': user.userrole}), 200 
    current_app.logger.warning('Login failed: Invalid credentials for user %s', data['username'])
    return jsonify({'message': 'Invalid credentials'}), 401
    

@app.route('/validate-token', methods=['POST'])
@jwt_required()
def validate():
    return jsonify({"msg": "Token is valid"}), 200
    
@app.route('/tasks', methods=['GET'])
@jwt_required()
@limiter.limit("30 per minute")
def get_tasks():
    tasks = Task.query.all()
    return jsonify([task.to_dict() for task in tasks])

@app.route('/tasks', methods=['POST'])
@jwt_required()
@limiter.limit("30 per minute")
def create_task():
    request_data = request.json
    schema = CreateTaskSchema()
    try:
        # Validate request body against schema data types
        result = schema.load(request_data)
        status = status_map.get(result['status_id'], 'Unknown')
        
        current_user = get_jwt_identity()
        created_by_id = current_user['id']
        created_by = current_user['username']
        task_history = task_history=json.dumps([{
            "id": created_by_id,
            "name": created_by,
            "message": "Task created",
            "datetime": datetime.utcnow().isoformat()
        }])
        new_task = Task(title=result['title'], description=result['description'], status_id=result['status_id'], 
        status=status, task_history=task_history, created_by_id=created_by_id, created_by=created_by)

        db.session.add(new_task)
        db.session.commit()
        return jsonify(new_task.to_dict()), 201
    except ValidationError as err:
        # Return a nice message if validation fails
        return jsonify(err.messages), 400
        
        
@app.route('/tasks/<int:task_id>', methods=['PUT'])
@jwt_required()
@limiter.limit("30 per minute")
def update_task(task_id):
    

    request_data = request.json
    schema = UpdateTaskSchema()
    try:
        # Validate request body against schema data types
        result = schema.load(request_data)
        status = status_map.get(result['status_id'], 'Unknown') 
    
        current_user = get_jwt_identity()
        user_id = current_user['id']
        username = current_user['username']
    
        task = Task.query.get(task_id)
        if not task:
            abort(404, description=f"Task with ID {task_id} not found")

            
        changes = []
    
        if 'title' in result and result['title'] != task.title:
            changes.append(f"title changed from {task.title} to {result['title']}")
            task.title = result['title']
    
        if 'description' in result and result['description'] != task.description:
            changes.append(f"description changed from {task.description} to {result['description']}")
            task.description = result['description']
    
        if 'status_id' in result and result['status_id'] != task.status_id:
            changes.append(f"status changed from {task.status} to {status}")
            task.status_id = result['status_id']
            task.status = status
    
        if changes:
            update_task_history(task, user_id, username, ", ".join(changes))
    
        db.session.commit() 
        return jsonify(schema.dump(task)), 200
    except ValidationError as err:
        # Return a nice message if validation fails
        return jsonify({'message': 'Invalid Id'}), 401

@app.route('/tasks/<int:task_id>', methods=['DELETE'])
@jwt_required()
@limiter.limit("5 per minute")
def delete_task(task_id):
    
    task = Task.query.get(task_id)
    if not task:
        abort(404, description=f"Task with ID {task_id} not found")
    db.session.delete(task)
    db.session.commit()
    return jsonify({'message': 'Task deleted'})

if __name__ == '__main__':
    app.run()