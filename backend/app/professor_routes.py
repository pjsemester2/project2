from flask import Blueprint, request, jsonify

professor_bp = Blueprint('professor', __name__)

@professor_bp.route('/professors', methods=['GET'])
def get_professors():
    from .models import Professor
    from . import db
    
    professors = Professor.query.all()
    professor_list = [{'name': professor.name} for professor in professors]
    return jsonify({'professors': professor_list}), 200