from flask_sqlalchemy import SQLAlchemy
from datetime import datetime as dt
# This is the connection to the PostgreSQL database; we're getting this through
# the Flask-SQLAlchemy helper library. On this, we can find the `session`
# object, where we do most of our interactions (like committing, etc.)

db = SQLAlchemy()


##############################################################################
# Model definitions

class User(db.Model):
    """A registered of mapmosphere"""

    __tablename__ = "users"

    user_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    email = db.Column(db.String(64), nullable=True)
    password = db.Column(db.String(128), nullable=True)

    def __repr__(self):
        """Provide helpful representation of User instance when printed."""
        return f"<User user_id={self.user_id} email={self.email}>"


class Message(db.Model):
    """Message object"""

    __tablename__ = "messages"

    message_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    message_text = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime)
    lat = db.Column(db.Float)
    lng = db.Column(db.Float)

    def __repr__(self):
        """Provide helpful representation when printed."""
        return f"<Message message_text={self.message_text} message_id={self.message_id} created_at={self.created_at} lat={self.lat} lng={self.lng} >"

class LikedMessages(db.Model):
    """A liked message"""
    
    __tablename__ = "liked_messages"

    liked_message_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    message_id = db.Column(db.Integer,db.ForeignKey('messages.message_id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))

    # Define relationship to user
    user = db.relationship("User", backref=db.backref("liked_messages", order_by=liked_message_id))
    #Relationship to message
    message = db.relationship("Message", backref=db.backref("liked_messages", order_by=liked_message_id))


##############################################################################
# Helper functions

def connect_to_db(app, db_uri='postgresql:///mapmosphere'):
    """Connect the database to our Flask app."""

    # Configure to use our PstgreSQL database
    app.config['SQLALCHEMY_DATABASE_URI'] = db_uri
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.app = app
    db.init_app(app)


# test data 
def example_message_data():
    """Create example data for the test database."""
    current_time = dt.now()
    message1 = Message(message_text="this is a test message", created_at=current_time, lat=115.7381037, lng=-32.0475)
    message2 = Message(message_text="this is a second test message", created_at=current_time, lat=-151.5129, lng=-63.1016)
    db.session.add(message1)
    db.session.add(message2)
    db.session.commit()

if __name__ == "__main__":
    from serve import app
    connect_to_db(app)
