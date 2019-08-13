import unittest
import json
from serve import app
from model import Message
from model import connect_to_db, example_message_data, db

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
        connect_to_db(app, db_uri='postgresql:///testdb')

        # Create tables and add sample data (uncomment when testing database)

        #db.create_all()
        #example_message_data()

    def tearDown(self):
        """Do at end of every test."""

        db.session.close()
        db.drop_all()



if __name__ == "__main__":
    unittest.main()