from flask import Blueprint, jsonify
from .models import Admin, Professor, Course, Program, Student

test_bp = Blueprint('test', __name__)

@test_bp.route('/test-db', methods=['GET'])
def test_db():
    try:
        # Query the Admin table to test the database connection
        admins = Admin.query.all()
        admin_list = [{'username': admin.username} for admin in admins]
        
        # Query the Professor table to test the database connection
        professors = Professor.query.all()
        professor_list = [{'name': professor.name} for professor in professors]
        
        # Query the Course table to test the database connection
        courses = Course.query.all()
        course_list = [{'course': course.course} for course in courses]
        
        # Query the Program table to test the database connection
        programs = Program.query.all()
        program_list = [{'ProgramName': program.ProgramName} for program in programs]
        
        # Query the Student table to test the database connection
        students = Student.query.all()
        student_list = [{'name': student.name} for student in students]
        
    
        return jsonify({
            'admins': admin_list,
            'professors': professor_list,
            'courses': course_list,
            'programs': program_list,
            'students': student_list,
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500