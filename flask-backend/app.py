from flask import Flask
from flask_jwt_extended import JWTManager
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from config import Config
from models import db  # Pastikan models di-import dengan benar
from flask_migrate import Migrate
from flask_cors import CORS

app = Flask(__name__)
# Load configuration
app.config.from_object(Config)
CORS(app) 

# Initialize database and migration
db.init_app(app)
migrate = Migrate(app, db)  # Initialize Flask-Migrate

# Initialize JWT and rate limiter
jwt = JWTManager(app)
limiter = Limiter(key_func=get_remote_address)
limiter.init_app(app)

from routes import *

if __name__ == '__main__':
    app.run(debug=True)
