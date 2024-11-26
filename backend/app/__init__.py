from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from config import Config

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    CORS(app)
    
    # Configure the SQLAlchemy part of the app instance
    app.config['SQLALCHEMY_DATABASE_URI'] = f"mysql+mysqlconnector://{Config.DB_USER}:{Config.DB_PASSWORD}@{Config.DB_HOST}:{Config.DB_PORT}/{Config.DB_NAME}"
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    # Initialize the app with the extension
    db.init_app(app)
    
    # Import models to register them with SQLAlchemy
    with app.app_context():
        from .models import Course, Student, Professor, Program, Admin  # Import models here

    # Register blueprints
    from .auth_routes import auth_bp
    from .admin_routes import admin_bp
    from .professor_routes import professor_bp
    from .student_routes import student_bp
    from .test_routes import test_bp
    from .course_routes import course_bp
    from .program_routes import program_bp

    app.register_blueprint(auth_bp)
    app.register_blueprint(admin_bp)
    app.register_blueprint(professor_bp)
    app.register_blueprint(student_bp)
    app.register_blueprint(test_bp)
    app.register_blueprint(course_bp)
    app.register_blueprint(program_bp)

    return app