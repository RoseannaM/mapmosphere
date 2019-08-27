from model import Message, User, LikedMessage, connect_to_db, db
from serve import app
from testMessages import testGeojsonData
from datetime import datetime, timedelta
from werkzeug.security import generate_password_hash, check_password_hash


test = 'postgresql:///testdb'

def create_test_data():
    """Load messages into test database."""

    # current_time = datetime.utcnow()
    # testTime = current_time

    # testGeojsonData = {
    #     "message0 ": {
    #         "time" : testTime - timedelta(hours=5),
    #         "message-text" : "This is a cool app",
    #         "lat" : -150.4048,
    #         "lng" : 63.1224
    #     },
    #     "message1": {
    #         "time" : testTime - timedelta(hours=10),
    #         "message-text" : "This is a fun app",
    #         "lat" : -151.3597,
    #         "lng" : 63.0781
    #     },
    #      "message2": {
    #         "time" : testTime + timedelta(hours=4),
    #         "message-text" : "This is a silly app",
    #         "lat" : -117.0155,
    #         "lng" : 33.656333
    #     },
    #     "message3": {
    #         "time" : testTime + timedelta(hours=2),
    #         "message-text" : "This is a weird app",
    #         "lat" : -94.8319,
    #         "lng" : 16.7195
    #     },
    #     "message4": {
    #         "time" : testTime + timedelta(hours=6),
    #         "message-text" : "Oh did you see the news?",
    #         "lat" : -92.8319,
    #         "lng" : 13.7195
    #     },
    #       "message5": {
    #         "time" : testTime + timedelta(hours=3),
    #         "message-text" : "Oh did you see the news?",
    #         "lat" : -150.8319,
    #         "lng" : 33.7195
    #     }
    # }

    testUserData = {
        "user1" : {
            "email" : "test@test",
            "password" : "test"
        },
         "user2" : {
            "email" : "test@test1",
            "password" : "test1"
        }
    }
    def addUsers():
        """add test user data to test db"""
        
        for user in testUserData:
            pass_hash = generate_password_hash(testUserData[user]["password"])
            testUser = User(email=testUserData[user]["email"], password=pass_hash)
            db.session.add(testUser)
        db.session.commit()

    def addMessages():
        """add test message data to test db"""

        for key in testGeojsonData:
            message = Message(message_text=testGeojsonData[key]["message-text"], created_at=testGeojsonData[key]["time"], lat=testGeojsonData[key]["lat"], lng=testGeojsonData[key]["lng"])
            db.session.add(message)

        db.session.commit()

    def addLikedMessage():
        """add a message to liked list"""
        for num in range(3,5):
            likeMessage = LikedMessage(message_id=num,user_id=2)
            db.session.add(likeMessage)
        db.session.commit()
    
    addUsers()
    addMessages()
    addLikedMessage()

if __name__ == "__main__":
    connect_to_db(app, test)
    db.create_all()
    create_test_data()