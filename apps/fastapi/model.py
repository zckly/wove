from sqlalchemy.schema import Column
from sqlalchemy.types import String, Integer, Text
from database import Base

class Task(Base):
    tablename = "Tasks"		
    id = Column(Integer, primary_key=True, index=True)		
    task_name = Column(String(20))		
    task_des = Column(Text())		
    created_by = Column(String(20))		
    date_created = Column(String(15))