
from flask import Blueprint, request, jsonify
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from backend.database.models import Base, Module, PlayerModule # Assuming models.py is in the same directory or properly importable

workshop_bp = Blueprint('workshop_api', __name__)

# Database setup (adjust as per your actual database configuration)
# For simplicity, using SQLite here. In a real app, this would be configured centrally.
engine = create_engine('sqlite:///hamsterheist.db')
Base.metadata.create_all(engine) # Ensure tables are created
Session = sessionmaker(bind=engine)

@workshop_bp.route('/modules', methods=['GET'])
def get_all_modules():
    session = Session()
    try:
        modules = session.query(Module).all()
        return jsonify([
            {
                'id': m.id,
                'name': m.name,
                'description': m.description,
                'cost': m.cost,
                'is_active': m.is_active
            } for m in modules
        ])
    finally:
        session.close()

@workshop_bp.route('/player/<int:player_id>/modules', methods=['GET'])
def get_player_modules(player_id):
    session = Session()
    try:
        player_modules = session.query(PlayerModule).filter_by(player_id=player_id).all()
        return jsonify([
            {
                'id': pm.id,
                'module_id': pm.module_id,
                'is_equipped': pm.is_equipped,
                'name': pm.module.name, # Accessing module name via relationship
                'description': pm.module.description
            } for pm in player_modules
        ])
    finally:
        session.close()

@workshop_bp.route('/player/<int:player_id>/buy_module/<int:module_id>', methods=['POST'])
def buy_module(player_id, module_id):
    session = Session()
    try:
        module = session.query(Module).get(module_id)
        if not module:
            return jsonify({'message': 'Module not found'}), 404

        # In a real application, you would check player's scrap balance here
        # and deduct the cost. For now, we'll just add the module.

        player_module = PlayerModule(player_id=player_id, module_id=module_id, is_equipped=False)
        session.add(player_module)
        session.commit()
        return jsonify({'message': 'Module purchased successfully', 'module': module.name}), 200
    except Exception as e:
        session.rollback()
        return jsonify({'message': str(e)}), 500
    finally:
        session.close()

@workshop_bp.route('/player/<int:player_id>/equip_module/<int:player_module_id>', methods=['POST'])
def equip_module(player_id, player_module_id):
    session = Session()
    try:
        player_module = session.query(PlayerModule).filter_by(id=player_module_id, player_id=player_id).first()
        if not player_module:
            return jsonify({'message': 'Player module not found'}), 404

        # Unequip any other active modules of the same type if necessary
        # For simplicity, this example allows multiple equipped modules.

        player_module.is_equipped = not player_module.is_equipped # Toggle equip status
        session.commit()
        status = "equipped" if player_module.is_equipped else "unequipped"
        return jsonify({'message': f'Module {status} successfully', 'module': player_module.module.name}), 200
    except Exception as e:
        session.rollback()
        return jsonify({'message': str(e)}), 500
    finally:
        session.close()
