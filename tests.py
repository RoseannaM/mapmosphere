import unittest
import json
from serve import app
from testData import create_test_data
from model import connect_to_db, db, Message

class MapmosphereApiTests(unittest.TestCase):
    """Tests for the mapmosphere site."""

    def setUp(self):
        self.client = app.test_client()
        app.config['TESTING'] = True

    # def test_homepage(self):
    #     result = self.client.get("/")
    #     print(result.data)
    #     self.assertEqual(result.status_code, 200)

    # def test_message_post(self):
    #     """Test message is sent to the database"""
    #     result = self.client.post("/spirit/api/v1.0/message",
    #                               json={'messageText': 'this is a test message'})
    #     json_data = result.get_json()
    #     self.assertEqual(result.status_code, 200)


class MapmosphereTestsDatabase(unittest.TestCase):
    """Tests for the mapmosphere database"""

    def setUp(self):
        """Do before each test"""

        self.client = app.test_client()
        app.config['TESTING'] = True
        
        # Connect to test database (uncomment when testing database)
        connect_to_db(app, db_uri='postgresql:///mapmosphere')
        db.create_all()
        create_test_data()
    
    def test_message_count(self):
        response = self.client.get("/spirit/api/v1.0/geojson.json")
        json_data = json.loads(response.data)
        messageCount = len(json_data['features'])
        self.assertTrue(messageCount == 6)

    def test_feature_type(self):
        response = self.client.get("/spirit/api/v1.0/geojson.json")
        json_data = json.loads(response.data)
        message = json_data
        featureType = message['features'][0]['geometry']['type']
        self.assertTrue(featureType == 'Point')

    def tearDown(self):
        """Do at end of every test."""

        db.session.close()
        db.drop_all()


if __name__ == "__main__":
    unittest.main()