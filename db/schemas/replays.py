from sqlalchemy import Column, Integer, String, Float, Text
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Replay(Base):
    __tablename__ = 'replays'

    id = Column(Integer, primary_key=True)
    match_id = Column(String, nullable=False, unique=True)
    timestamp = Column(Float, nullable=False)
    duration = Column(Float, nullable=False)
    replay_data = Column(Text, nullable=False) # Storing JSON string of events

    def __repr__(self):
        return f"<Replay(id={self.id}, match_id='{self.match_id}')>"
