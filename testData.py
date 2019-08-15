from model import Message, connect_to_db, db
from serve import app
from datetime import datetime, timedelta

test = 'postgresql:///testdb'

def create_test_data():
    """Load messages into test database."""

    current_time = datetime.utcnow()
    testTime = current_time

    testData = {
        "message0 ": {
            "time" : testTime - timedelta(hours=5),
            "message-text" : "This is a cool app",
            "lat" : -150.4048,
            "lng" : 63.1224
        },
        "message1": {
            "time" : testTime - timedelta(hours=10),
            "message-text" : "This is a fun app",
            "lat" : -151.3597,
            "lng" : 63.0781
        },
         "message2": {
            "time" : testTime + timedelta(hours=4),
            "message-text" : "This is a silly app",
            "lat" : -117.0155,
            "lng" : 33.656333
        },
        "message3": {
            "time" : testTime + timedelta(hours=2),
            "message-text" : "This is a weird app",
            "lat" : -94.8319,
            "lng" : 16.7195
        },
        "message4": {
            "time" : testTime + timedelta(hours=6),
            "message-text" : "Oh did you see the news?",
            "lat" : -92.8319,
            "lng" : 13.7195
        },
          "message5": {
            "time" : testTime + timedelta(hours=3),
            "message-text" : "Oh did you see the news?",
            "lat" : -150.8319,
            "lng" : 33.7195
        }
    }

    
    for key in testData:
        message = Message(message_text=testData[key]["message-text"], created_at=testData[key]["time"], lat=testData[key]["lat"], lng=testData[key]["lng"])
        db.session.add(message)

    db.session.commit()
    

if __name__ == "__main__":
    connect_to_db(app, test)
    db.create_all()
    create_test_data()