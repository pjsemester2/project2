from datetime import datetime
from . import db

class Admin(db.Model):
    __tablename__ = 'admin'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(255), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)

    def __repr__(self):
        return f'<Admin {self.username}>'

class Professor(db.Model):
    __tablename__ = 'professors'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)

    def __repr__(self):
        return f'<Professor {self.username}>'

class Course(db.Model):
    __tablename__ = 'courses'
    
    id = db.Column(db.Integer, primary_key=True)
    course = db.Column(db.String(255), nullable=False)
    professor = db.Column(db.String(255), nullable=False)
    ProgramName = db.Column(db.String(255), nullable=False)

    def __repr__(self):
        return f'<Course {self.name}>'

class Program(db.Model):
    __tablename__ = 'programs'
    
    id = db.Column(db.Integer, primary_key=True)
    ProgramName = db.Column(db.String(255), nullable=False)

    def __repr__(self):
        return f'<Program {self.name}>'

class Student(db.Model):
    __tablename__ = 'm2 students 2024'
    
    id = db.Column(db.Integer, primary_key=True)
    surname = db.Column(db.String(255), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    country = db.Column(db.String(255), nullable=False)

    def __repr__(self):
        return f'<Student {self.name}>'
