from flask import Blueprint, request, jsonify

activity_bp = Blueprint('activity', __name__)

@activity_bp.route('/activities', methods=['GET'])
def get_activities():
    from .models import Activity
    from . import db
    
    recent_activities = Activity.query.all()
    activity_list = [{'name': recent_activities.name} for activity in recent_activities]
    return jsonify({'activities': activity_list}), 200