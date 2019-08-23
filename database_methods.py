from model import Message, User
from model import connect_to_db, db
from datetime import datetime, timedelta


def get_active_messages():
    """get all active messages in the database"""

    current_time = datetime.utcnow()
    twenty_four_hours_ago = current_time - timedelta(hours=24)

    messages_within_twentyfour_hours = Message.query.filter(
        Message.created_at > twenty_four_hours_ago).all()

    return messages_within_twentyfour_hours


def get_all_liked_messages(user_id):
    """get all messages in the database that have been liked by a user"""
    all_liked = set(User.query.get(user_id).likes)
    return all_liked


def create_geoJson(session):
    """create geojson object"""
    liked_messages = set()

    if session["logged_in"] == True:
        user_id = session["id"]
        # set liked to either true or false for each message
        liked_messages = get_all_liked_messages(user_id)

    features = []
    messages = get_active_messages()

    for message in messages:
        feature = {"type": "Feature",
                   "properties": {
                       "id": message.message_id,
                       "text": message.message_text,
                       "liked": message in liked_messages if session["logged_in"] else None
                   },
                   "geometry": {
                       "type": "Point",
                       "coordinates": [message.lat, message.lng]
                   }
                   }
        features.append(feature)

    geoJson = {"type": "FeatureCollection",
               "features": features
               }
    return geoJson
