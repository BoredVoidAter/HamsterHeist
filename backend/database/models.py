
from sqlalchemy import create_engine, Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship

Base = declarative_base()

class Module(Base):
    __tablename__ = 'modules'
    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True, nullable=False)
    description = Column(String)
    cost = Column(Integer, nullable=False)
    is_active = Column(Boolean, default=False) # True for active abilities, False for passive
    ability_code = Column(String) # Stores code/identifier for the module's effect

    def __repr__(self):
        return f"<Module(name='{self.name}', cost={self.cost})>"

class PlayerModule(Base):
    __tablename__ = 'player_modules'
    id = Column(Integer, primary_key=True)
    player_id = Column(Integer, nullable=False) # Assuming player_id from main game DB
    module_id = Column(Integer, ForeignKey('modules.id'))
    is_equipped = Column(Boolean, default=False)

    module = relationship("Module")

    def __repr__(self):
        return f"<PlayerModule(player_id={self.player_id}, module_id={self.module_id}, equipped={self.is_equipped})>"

# Example of how to set up the database (for development/testing)
# engine = create_engine('sqlite:///hamsterheist.db')
# Base.metadata.create_all(engine)
# Session = sessionmaker(bind=engine)
# session = Session()
