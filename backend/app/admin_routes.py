from flask import Blueprint, request, jsonify

admin_bp = Blueprint('admin', __name__)

@admin_bp.route('/admins', methods=['GET'])
def get_admins():
    from .models import Admin
    from . import db
    
    admins = Admin.query.all()
    admin_list = [{'username': admin.username} for admin in admins]
    return jsonify({'admins': admin_list}), 200

@admin_bp.route('/counts', methods=['GET'])
def get_counts():
    try:
        from .models import Course, Student, Professor, Program
        from . import db
        
        courses_count = db.session.query(Course).count()
        students_count = db.session.query(Student).count()
        professors_count = db.session.query(Professor).count()
        programs_count = db.session.query(Program).count()

        return jsonify({
            'courses': courses_count,
            'students': students_count,
            'professors': professors_count,
            'programs': programs_count
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@admin_bp.route('/recent-activities', methods=['GET'])
def get_recent_activities():
    try:
        from .models import Activity
        from . import db
        
        recent_activities = Activity.query.order_by(Activity.id.desc()).limit(10).all()
        activity_list = [{'description': activity.description, 'created_at': activity.created_at} for activity in recent_activities]
        return jsonify({'activities': activity_list}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500