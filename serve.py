from flask import abort, Flask, render_template, request, jsonify, flash, redirect, session
from flask_debugtoolbar import DebugToolbarExtension
from flask_simple_geoip import SimpleGeoIP
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash

from database_methods import create_geoJson
from model import connect_to_db, db, Message, User, LikedMessage
from datetime import datetime, timedelta

app = Flask(__name__, static_folder="build/static", template_folder="build")
CORS(app,supports_credentials=True)
app.config['SECRET_KEY'] = "ABC"
app.config["GEOIPIFY_API_KEY"] = "at_fq3Zklt83usgp4FESotLUAgZPwhFv"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
simple_geoip = SimpleGeoIP(app)


prod = 'postgresql:///mapmosphere'
test = 'postgresql:///testdb'

@app.route("/")
def home():
    return render_template('index.html')

@app.route("/spirit/api/v1.0/geojson.json")
def geojson():
    """serve geojson data object"""
    return jsonify(create_geoJson())

@app.route("/spirit/api/v1.0/me", methods=["GET"])
def get_user():
    """checks if user is logged in"""
    return jsonify(dict(session))

# https://blog.miguelgrinberg.com/post/designing-a-restful-api-with-python-and-flask
@app.route("/spirit/api/v1.0/messages", methods=["GET"])
def get_messages():
    """returns all messages"""
    return "return all messages from database"

@app.route("/spirit/api/v1.0/message/<int:message_id>", methods=["GET"])
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
    data = request.get_json()
    message_text = data["messageText"]
    message = Message(message_text=message_text, created_at=current_time, lat=lat, lng=lng)
    db.session.add(message)
    db.session.commit()
    return data

@app.route("/spirit/api/v1.0/favourites/create", methods=["POST"])
def like_message():
    """adds message to liked messages table"""
    data = request.get_json()
    message_id = data["messageText"]
    user_id = data["userId"]

@app.route("/spirit/api/v1.0/register", methods=["POST"])
def register_user():
    """adds a new user"""
    data = request.get_json()
   
    if request.method == "POST":
        email = data["email"]
        password = data["password"]
        pass_hash = generate_password_hash(password)
        user = User.query.filter_by(email=email).first()
    
        if user is None:
            user = User(email=email, password=pass_hash)
            db.session.add(user)
            db.session.commit()
            
            newUser = User.query.filter_by(email=email).first()
            session["id"] = newUser.user_id
            session['logged_in'] = True
            print(session)
            return jsonify({"success": "registered and logged in"}), 200
        else:
            return jsonify({"error": "User aleady exists"}), 400
    return data

@app.route("/spirit/api/v1.0/login", methods=["POST"])
def login_user():
    """logs in a user"""

    data = request.get_json()

    if request.method == "POST":
        email = data['email']
        password = data['password']
        user = User.query.filter_by(email=email).first()

        if user is None:
            return jsonify({"error": "User does not exist"}), 400
        else:
            pass_hash = check_password_hash(user.password, password)
            if pass_hash:
                session["id"] = user.user_id
                session['logged_in'] = True
                return jsonify({"success": "logged in"}), 200
            else:
                return jsonify({"error": "Wrong password"}), 400
    return data

@app.route("/spirit/api/v1.0/logout", methods=["POST"])
def logout_user():
    """remove user from session"""
    session['logged_in'] = False
    session.pop("id", None)
    return jsonify({"success": "logged out"}), 200


if __name__ == "__main__":
    app.debug=True
    app.jinja_env.auto_reload = app.debug
    
    #connect to main database
    connect_to_db(app, test)
  
    print("Connected to DB.")
    DebugToolbarExtension(app)
    app.run(host='0.0.0.0', port='5000')