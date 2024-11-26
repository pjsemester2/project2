from flask import Blueprint, request, jsonify
from .models import Course
from . import db

course_bp = Blueprint('course', __name__)

@course_bp.route('/courses', methods=['GET'])
def get_courses():
    courses = Course.query.all()
    course_list = [{'id': course.id, 'course': course.course, 'professor': course.professor, 'ProgramName': course.ProgramName} for course in courses]
    return jsonify({'courses': course_list}), 200

@course_bp.route('/courses', methods=['POST'])
def add_course():
    data = request.get_json()
    new_course = Course(name=data['course'], professor=data['professor'], program=data['program'])
    db.session.add(new_course)
    db.session.commit()
    return jsonify({'message': 'Course added successfully'}), 201

@course_bp.route('/courses/<int:id>', methods=['PUT'])
def update_course(id):
    data = request.get_json()
    course = Course.query.get(id)
    if course:
        course.name = data['course']
        course.professor = data['professor']
        course.program = data['program']
        db.session.commit()
        return jsonify({'message': 'Course updated successfully'}), 200
    else:
        return jsonify({'message': 'Course not found'}), 404

@course_bp.route('/courses/<int:id>', methods=['DELETE'])
def delete_course(id):
    course = Course.query.get(id)
    if course:
        db.session.delete(course)
        db.session.commit()
        return jsonify({'message': 'Course deleted successfully'}), 200
    else:
        return jsonify({'message': 'Course not found'}), 404