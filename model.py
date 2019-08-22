from flask_sqlalchemy import SQLAlchemy
from datetime import datetime as dt
# This is the connection to the PostgreSQL database; we're getting this through
# the Flask-SQLAlchemy helper library. On this, we can find the `session`
# object, where we do most of our interactions (like committing, etc.)

db = SQLAlchemy()

prod = 'postgresql:///mapmosphere'
test = 'postgresql:///testdb'
##############################################################################
# Model definitions

class User(db.Model):
    """A registered of mapmosphere"""

    __tablename__ = "users"

    user_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    email = db.Column(db.String(64), nullable=True)
    password = db.Column(db.String(128), nullable=True)

    likes = db.relationship('Message', secondary="liked_messages")

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
        """Provide helpful representation of message instance when printed."""
        return f"<Message message_text={self.message_text} message_id={self.message_id} created_at={self.created_at} lat={self.lat} lng={self.lng} >"

class LikedMessage(db.Model):
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
#'postgresql:///mapmosphere'
def connect_to_db(app, db_uri):
    """Connect the database to our Flask app."""
    # Configure to use our PstgreSQL database
    app.config['SQLALCHEMY_DATABASE_URI'] = db_uri
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.app = app
    db.init_app(app)


if __name__ == "__main__":
    from serve import app
    connect_to_db(app, test)
