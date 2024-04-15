from config import db

class Schedule(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    month = db.Column(db.Integer, unique=False, nullable=False)
    day = db.Column(db.Integer, unique=False, nullable=False)
    year = db.Column(db.Integer, unique = False, nullable=False)
    title = db.Column(db.String(100), unique=True, nullable=False)
    desc = db.Column(db.String(1000), unique=False, nullable=False)
    
    def to_json(self):
        return{
            "id": self.id,
            "month": self.month,
            "day": self.day,
            "year": self.year,
            "title": self.title,
            "desc": self.desc,
        }