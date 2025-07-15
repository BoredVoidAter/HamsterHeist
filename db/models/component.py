from sqlalchemy import Column, Integer, String, Float, Boolean
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Component(Base):
    __tablename__ = 'components'

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    type = Column(String, nullable=False) # e.g., 'sensor', 'utility'
    energy_cost = Column(Float, default=0.0)
    description = Column(String)
    is_active = Column(Boolean, default=False)

    __mapper_args__ = {
        'polymorphic_identity': 'component',
        'polymorphic_on': type
    }

class LidarScanner(Component):
    __tablename__ = 'lidar_scanners'
    __mapper_args__ = {
        'polymorphic_identity': 'lidar_scanner'
    }
    id = Column(Integer, primary_key=True)
    range = Column(Float, default=5.0)
    resolution = Column(Integer, default=10)

class HackingModule(Component):
    __tablename__ = 'hacking_modules'
    __mapper_args__ = {
        'polymorphic_identity': 'hacking_module'
    }
    id = Column(Integer, primary_key=True)
    hack_strength = Column(Integer, default=1)
    cooldown = Column(Float, default=5.0)
