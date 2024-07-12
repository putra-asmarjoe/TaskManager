import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'uREgselIoCi1SEEGzyDZ6vMCrWyvQUYu')
    basedir = os.path.abspath(os.path.dirname(__file__))
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'sqlite:///' + os.path.join(basedir, 'site.db'))
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'Q3Zv1H70yRGIJj8j2hDrBvJX7RNSKjPa')
    JWT_ACCESS_TOKEN_EXPIRES = 3600
