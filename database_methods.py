from model import Message, User
from model import connect_to_db, db
from datetime import datetime, timedelta


def get_active_messages():
    """get all active messages in the database"""

    current_time = datetime.utcnow()
    twenty_four_hours_ago = current_time - timedelta(hours=24)

    messages_within_twentyfour_hours = set(Message.query.filter(
        Message.created_at > twenty_four_hours_ago).all())

    return messages_within_twentyfour_hours


def get_all_liked_messages(user_id):
    """get all messages in the database that have been liked by a user"""
    all_liked = set(User.query.get(user_id).likes)
    return all_liked


def message_to_feature(message, liked):
    """return single feature object"""

    feature = {"type": "Feature",
               "properties": {
                       "id": message.message_id,
                       "text": message.message_text,
                       "liked": liked,
                       "country" : message.country,
                       "city": message.city,
                       "state": message.state
               },
               "geometry": {
                   "type": "Point",
                   "coordinates": [message.lng, message.lat]
               }
               }
    return feature


def create_liked_features(messages):
    """create features for liked messages"""

    liked_features = []
    for message in messages.items:
        feature = message_to_feature(message.message, True)
        liked_features.append(feature)
    return liked_features


def create_geoJson(session):
    """create geojson object"""
    liked_messages = set()

    if session["logged_in"] == True:
        user_id = session["id"]
        liked_messages = get_all_liked_messages(user_id)

    features = []
    
    messages = get_active_messages()

    for message in messages:
        liked = message in liked_messages if session["logged_in"] else None

        feature = message_to_feature(message, liked)
        
        features.append(feature)

    #handle liked messages that have timed out 

    for liked in liked_messages:
        liked_feature = message_to_feature(liked, True)
        if liked_feature not in features:
            features.append(liked_feature)


    geoJson = {"type": "FeatureCollection",
               "features": features
               }
    return geoJson
