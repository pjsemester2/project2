from flask import Blueprint, request, jsonify

student_bp = Blueprint('student', __name__)

@student_bp.route('/students', methods=['GET'])
def get_students():
    from .models import Student
    from . import db
    
    students = Student.query.all()
    student_list = [{'name': student.name, 'surname': student.surname} for student in students]
    return jsonify({'students': student_list}), 200