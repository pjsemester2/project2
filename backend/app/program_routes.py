from flask import Blueprint, request, jsonify

program_bp = Blueprint('program', __name__)

@program_bp.route('/programs', methods=['GET'])
def get_programs():
    from .models import Program
    from . import db
    
    programs = Program.query.all()
    program_list = [{'id': program.id, 'ProgramName': program.ProgramName} for program in programs]
    return jsonify({'programs': program_list}), 200

@program_bp.route('/programs', methods=['POST'])
def add_program():
    from .models import Program
    from . import db
    
    data = request.get_json()
    new_program = Program(ProgramName=data['ProgramName'])
    db.session.add(new_program)
    db.session.commit()
    return jsonify({'message': 'Program added successfully'}), 201

@program_bp.route('/programs/<int:id>', methods=['PUT'])
def update_program(id):
    from .models import Program
    from . import db
    
    data = request.get_json()
    program = Program.query.get(id)
    if program:
        program.ProgramName = data['ProgramName']
        db.session.commit()
        return jsonify({'message': 'Program updated successfully'}), 200
    else:
        return jsonify({'message': 'Program not found'}), 404

@program_bp.route('/programs/<int:id>', methods=['DELETE'])
def delete_program(id):
    from .models import Program
    from . import db
    
    program = Program.query.get(id)
    if program:
        db.session.delete(program)
        db.session.commit()
        return jsonify({'message': 'Program deleted successfully'}), 200
    else:
        return jsonify({'message': 'Program not found'}), 404