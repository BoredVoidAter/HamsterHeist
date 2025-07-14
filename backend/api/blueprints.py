from flask import Blueprint, request, jsonify

blueprints_bp = Blueprint('blueprints', __name__)

# This is a placeholder for a real database interaction
# In a real application, you would interact with your database here
blueprints_db = []

@blueprints_bp.route('/blueprints', methods=['POST'])
def publish_blueprint():
    data = request.json
    # Basic validation
    if not all(key in data for key in ['name', 'chassis_id', 'power_core_id', 'code', 'author_id']):
        return jsonify({'error': 'Missing required fields'}), 400

    blueprint = {
        'id': len(blueprints_db) + 1,
        'name': data['name'],
        'chassis_id': data['chassis_id'],
        'power_core_id': data['power_core_id'],
        'modules': data.get('modules', []), # Optional
        'code': data['code'],
        'author_id': data['author_id'],
        'created_at': '2025-07-14' # Placeholder
    }
    blueprints_db.append(blueprint)
    return jsonify(blueprint), 201

@blueprints_bp.route('/blueprints', methods=['GET'])
def search_blueprints():
    query = request.args.get('q', '').lower()
    results = [b for b in blueprints_db if query in b['name'].lower() or query in b['code'].lower()]
    return jsonify(results), 200

@blueprints_bp.route('/blueprints/<int:blueprint_id>', methods=['GET'])
def get_blueprint(blueprint_id):
    blueprint = next((b for b in blueprints_db if b['id'] == blueprint_id), None)
    if blueprint:
        return jsonify(blueprint), 200
    return jsonify({'error': 'Blueprint not found'}), 404
