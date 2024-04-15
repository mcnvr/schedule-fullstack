from flask import request, jsonify
from config import app, db
from models import Schedule

@app.route("/schedule", methods=["GET"])
def get_schedule():
    schedule = Schedule.query.all()
    json_schedule = list(map(lambda x: x.to_json(), schedule))
    return jsonify({"schedule": json_schedule})
    
@app.route("/create_item", methods=["POST"])
def create_item():
    month = request.json.get("month")
    day = request.json.get("day")
    year = request.json.get("year")
    title = request.json.get("title")
    desc = request.json.get("desc")
    
    if not month or not day or not year or not title or not desc:
        return (
            jsonify({"message": "You must include date, title, and description"}),
            400,
        )
        
    new_schedule = Schedule(month=month, day=day, year=year, title=title, desc=desc)
    try:
        db.session.add(new_schedule)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400
    
    return jsonify({"message": "Item created"}), 201

@app.route("/update_schedule/<int:item_id>", methods=["PATCH"])
def update_schedule(item_id):
    schedule = Schedule.query.get(item_id)
    
    if not schedule:
        return jsonify({"message": "Item not found"}), 404
    
    data = request.json
    schedule.month = data.get("month", schedule.month)
    schedule.day = data.get("day", schedule.day)
    schedule.year = data.get("year", schedule.year)
    schedule.title = data.get("title", schedule.title)
    schedule.desc = data.get("desc", schedule.desc)
    
    db.session.commit()
    
    return jsonify({"message": "Item updated"}), 200

@app.route("/delete_item/<int:item_id>", methods=["DELETE"])
def delete_item(item_id):
    schedule = Schedule.query.get(item_id)
    
    if not schedule:
        return jsonify({"message": "Item not found"}), 404
    
    db.session.delete(schedule)
    db.session.commit()
    
    return jsonify({"message": "Item deleted"}), 200
    
    

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    
    app.run(debug=True)
    