from flask import Blueprint, request, jsonify
from .models import Admin
from . import db

auth_bp = Blueprint('auth', __name__)


@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    name = data.get('username')
    passwrd = data.get('password')

    # Query the Admin table to find the user
    user = Admin.query.filter_by(username=name).first()

    # Check if the user exists
    if user and user.password == passwrd:
        return jsonify({'message': 'Login successful!'})
    else:
        return jsonify({'message': 'Login failed!'}), 401