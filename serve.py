from flask import Flask, render_template, request, jsonify
from flask_debugtoolbar import DebugToolbarExtension
from flask_simple_geoip import SimpleGeoIP
from database_methods import create_geoJson
from model import Message
from model import connect_to_db, db
from datetime import datetime, timedelta

app = Flask(__name__, static_folder="build/static", template_folder="build")
app.config['SECRET_KEY'] = "ABC"
app.config["GEOIPIFY_API_KEY"] = "at_fq3Zklt83usgp4FESotLUAgZPwhFv"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
simple_geoip = SimpleGeoIP(app)

@app.route("/")
def hello():
    return render_template('index.html')

@app.route("/spirit/api/v1.0/geojson")
def geojson():
    """serve geojson data object"""
    return jsonify(create_geoJson())


# https://blog.miguelgrinberg.com/post/designing-a-restful-api-with-python-and-flask
@app.route("/spirit/api/v1.0/messages", methods=["GET"])
def get_messages():
    """returns all messages"""
    return "return all messages from database"

@app.route("/spirit/api/v1.0/message /<int:message_id>", methods=["GET"])
def get_message(message_id):
    """returns a message by id"""
    return "return single message from database by id"

@app.route("/spirit/api/v1.0/message", methods=["POST"])
def post_message():
    """post a message to the database"""
    geoip_data = simple_geoip.get_geoip_data()
    lat = geoip_data.get('location').get('lat')
    lng = geoip_data.get('location').get('lng')
    
    current_time = datetime.utcnow()
    testMessageTime = current_time - timedelta(hours=26)
    testMessage = Message(message_text="test message_text", created_at=testMessageTime, lat=0, lng=0)
    data = request.get_json()
    message_text = data["messageText"]
    message = Message(message_text=message_text, created_at=current_time, lat=lat, lng=lng)
    db.session.add(message)
    db.session.add(testMessage)
    db.session.commit()
    return data


if __name__ == "__main__":
    app.debug=True
    app.jinja_env.auto_reload = app.debug
    
    #connect to main database
    connect_to_db(app)
    print("Connected to DB.")
    DebugToolbarExtension(app)
    app.run(host='0.0.0.0')