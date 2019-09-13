from model import Message, User, LikedMessage, connect_to_db, db
from serve import app
from testMessages import testGeojsonData
from datetime import datetime, timedelta
from werkzeug.security import generate_password_hash, check_password_hash

prod = 'postgresql:///mapmosphere'
test = 'postgresql:///testdb'


def create_test_data():
    """Load messages into test database."""

    testUserData = {
        "user1": {
            "email": "test@test",
            "password": "test"
        },
        "user2": {
            "email": "test@test1",
            "password": "test1"
        }
    }

    def addUsers():
        """add test user data to test db"""

        for user in testUserData:
            pass_hash = generate_password_hash(testUserData[user]["password"])
            testUser = User(
                email=testUserData[user]["email"], password=pass_hash)
            db.session.add(testUser)
        db.session.commit()

    def addMessages():
        """add test message data to test db"""

        for key in testGeojsonData:
            message = Message(message_text=testGeojsonData[key]["message-text"], created_at=testGeojsonData[key]["time"], lat=testGeojsonData[key]
                              ["lat"], lng=testGeojsonData[key]["lng"], country=testGeojsonData[key]["country"], city=testGeojsonData[key]["city"])
            db.session.add(message)

        db.session.commit()

    def addLikedMessage():
        """add a message to liked list"""
        for num in range(3, 5):
            likeMessage = LikedMessage(message_id=num, user_id=2)
            db.session.add(likeMessage)
        db.session.commit()

    addUsers()
    addMessages()
    #addLikedMessage()


if __name__ == "__main__":
    connect_to_db(app, prod)
    db.create_all()
    create_test_data()
