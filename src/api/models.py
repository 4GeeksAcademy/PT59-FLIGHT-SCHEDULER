from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from sqlalchemy import Column, Integer, String, DateTime
# from your_flask_app import db  # Import your Flask app's db instance
from sqlalchemy.orm import relationship

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = "user"
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(120), unique=False, nullable=False)
    last_name = db.Column(db.String(120), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    # reservations: List[Reservation]
  

    # is_admin = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # "is_admin": self.is_admin
            # do not serialize the password, its a security breach
        }


class Reservation(db.Model):
    __tablename__ = "reservation"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    start_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    end_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    
    user_id = db.Column(Integer, db.ForeignKey("user.id"))
    user = db.relationship(
        "User",
        backref=db.backref(
            "reservation",
            uselist=True
        ),
        uselist=False
    )
    
 
    # function that says that 

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "start_date": self.start_date,
            "end_date": self.end_date
        }
    
# user, login, sign up, password-reset, reservations, 
# class Helicopter(db.Model):
#     __tablename__ = "Helicopter"    
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(120), unique=True, nullable=False)

    
# class Announcement(db.Model):
#     __tablename__ = "Announcement"
#     id = db.Column(db.Integer, primary_key=True)
#     announcement_info  = db.Column(db.String(120), unique=True, nullable=False)
#     date = db.Column(db.Integer(120), unique=False, nullable=False)
    

#     def serialize(self):
#         return {
#             "id": self.id,
#             "name": self.announcement_info,
#             "date": self.date
#         }
    




# announcements, flighttakeoffs, 