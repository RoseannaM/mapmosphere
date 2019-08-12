"""Models and database functions for Mapmosphere project."""

from flask_sqlalchemy import SQLAlchemy

# This is the connection to the PostgreSQL database; we're getting this through
# the Flask-SQLAlchemy helper library. On this, we can find the `session`
# object, where we do most of our interactions (like committing, etc.)

db = SQLAlchemy()


##############################################################################
# Model definitions

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

##############################################################################
# Helper functions


def connect_to_db(app):
    """Connect the database to our Flask app."""

    # Configure to use our PstgreSQL database
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///mapmosphere'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.app = app
    db.init_app(app)


if __name__ == "__main__":
    # As a convenience, if we run this module interactively, it will leave
    # you in a state of being able to work with the database directly.
    pass