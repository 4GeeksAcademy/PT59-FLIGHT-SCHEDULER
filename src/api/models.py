from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = "User"
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    is_admin = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "is_admin": self.is_admin
            # do not serialize the password, its a security breach
        }


class Reservation(db.Model):
    __tablename__ = "Reservation"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    date = db.Column(db.Integer(120), unique=False, nullable=False)
    flight_time = db.Column(db.Integer(120), unique=False, nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "date": self.date,
            "flight_time": self.flight_time
        }
    

class Helicopter(db.Model):
    __tablename__ = "Helicopter"    
    id = db.Column
