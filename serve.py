from flask import abort, Flask, render_template, request, jsonify, flash, redirect, session
from flask_debugtoolbar import DebugToolbarExtension
from flask_simple_geoip import SimpleGeoIP
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from fetch_images import get_images
from database_methods import create_geoJson, create_liked_features, message_to_feature
from model import connect_to_db, db, Message, User, LikedMessage
from datetime import datetime, timedelta
import os
session_token = os.getenv('SESSION')
geo = os.getenv('GEOIPIFY_API_KEY')
app = Flask(__name__, static_folder="build/static", template_folder="build")
CORS(app, supports_credentials=True)

app.config['SECRET_KEY'] = session_token
app.config["GEOIPIFY_API_KEY"] = geo
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

print('\n\n\n\n')
if not os.environ.get('SECRET_KEY'):
    print("SECRETS NOT SOURCED!")
else:
    print("**~  Success ~** SECRETS LOADED")
print('\n\n\n\n')

#simple_geoip = SimpleGeoIP(app)

prod = 'postgresql:///mapmosphere'
test = 'postgresql:///testdb'
testingSession = None

@app.route("/")
def home():
    return render_template('index.html')


@app.route("/spirit/api/v1.0/geojson.json", methods=["GET"])
def geojson():
    """serve geojson data object"""
    return jsonify(create_geoJson(session))


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
    # geoip_data = simple_geoip.get_geoip_data()
    #lat = geoip_data.get('location').get('lat', None)
    #lng = geoip_data.get('location').get('lng', None)
    # country = geoip_data.get('location').get('country', None)
    # city = geoip_data.get('location').get('city', None)

    current_time = datetime.utcnow()
    data = request.get_json()
    lat = data["lat"]
    lng = data["lng"]
    city = data["city"]
    state = data["state"]
    country = data["country"]
    message_text = data["messageText"]
    message = Message(message_text=message_text,
                      created_at=current_time, lat=lat, lng=lng, city=city, state=state, country=country)
    db.session.add(message)
    db.session.commit()
    return message_to_feature(message, None)


@app.route("/spirit/api/v1.0/messages/<int:message_id>/like", methods=["POST"])
def like_message(message_id):
    """adds message to liked messages table"""
    user_id = session["id"]

    liked_message = LikedMessage(message_id=message_id, user_id=user_id)

    db.session.add(liked_message)

    db.session.commit()

    if liked_message:
        return jsonify({"success": "likedn"}), 200
    else:
        return jsonify({"error": "Message does not exist"}), 400


@app.route("/spirit/api/v1.0/message/<int:user_id>/like", methods=["GET"])
def get_liked_messages(user_id):
    """returns all liked messages by user id"""

    page = request.args.get('page', 1, type=int)

    liked_messages = LikedMessage.query.filter_by(
        user_id=user_id).paginate(page, 10, False)

    if liked_messages.has_next:
        print('yes')
    else:
        print("no")

    if user_id == session["id"]:
        return jsonify(create_liked_features(liked_messages), liked_messages.has_next), 200
    else:
        return jsonify({"error": "not authorised"}), 400


@app.route("/spirit/api/v1.0/messages/<int:message_id>/like", methods=["DELETE"])
def unlike_message(message_id):
    """removes message from liked messages table"""
    user_id = session["id"]
    liked_message = LikedMessage.query.filter_by(
        message_id=message_id, user_id=user_id).first()
    message = LikedMessage.query.get(liked_message.liked_message_id)

    db.session.delete(message)
    db.session.commit()

    if liked_message:
        return jsonify({"success": "liked"}), 200
    else:
        return jsonify({"error": "Message does not exist"}), 400


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


@app.route("/spirit/api/v1.0/images/<string:location>", methods=["GET"])
def get_images_by_location(location):
    """returns the most recent images by location data"""
    posts = get_images(location)
    return posts
    


@app.route("/spirit/api/v1.0/set/location", methods=["POST"])
def get_location():
    data = request.get_json()
    session['lat'] = data['lat']
    session['lng'] = data['lng']
    session['city'] = data['city']
    session['state'] = data['state']
    session['country'] = data['country']

    return jsonify(dict(session))


if __name__ == "__main__":
    app.debug = True
    app.jinja_env.auto_reload = app.debug

    # connect to main database
    connect_to_db(app, prod)

    print("Connected to DB.")
    DebugToolbarExtension(app)
    app.run(host='0.0.0.0', port='5000')
