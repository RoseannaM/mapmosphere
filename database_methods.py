from model import Message
from model import connect_to_db, db
from datetime import datetime, timedelta

def get_active_messages():
    """get all active messages in the database"""

    current_time = datetime.utcnow()
    twenty_four_hours_ago = current_time - timedelta(hours=24)

    messages_within_twentyfour_hours = Message.query.filter(
    Message.created_at > twenty_four_hours_ago).all()

    return messages_within_twentyfour_hours

def create_geoJson():
    """create geojson object"""
    
    features = []
    messages = get_active_messages()
    
    for message in messages:
        feature = {"type": "Feature", 
          "properties": {
              "id": message.message_id,
              "text": message.message_text
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
