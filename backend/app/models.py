from sqlalchemy import Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    email = Column(String(100), unique=True, index=True)
    password = Column(String(255))

    certificates = relationship("Certificate", back_populates="owner")


class Certificate(Base):
    __tablename__ = "certificates"

    id = Column(Integer, primary_key=True)
    title = Column(String(200))
    file_url = Column(String(500))
    original_filename = Column(String(255))  # 👈 ADD THIS
    issue_date = Column(Date)
    expire_date = Column(Date)
    owner_id = Column(Integer, ForeignKey("users.id"))

    owner = relationship("User", back_populates="certificates")