import sqlite3
import os

# database class to handle SQL functionality
class Database():
    #for now, each time the server is started, clear the database
    def __init__(self, reset=False):
        try:
            if reset:
                if hasattr(self, 'conn'):
                    self.conn.close()  # Close existing connection before attempting to remove the file
                os.remove("reviews.db")
        except Exception as e:
            print("Error while resetting database:", str(e))

        try:
            self.conn = sqlite3.connect("reviews.db")
            self.cursor = self.conn.cursor()
        except sqlite3.Error as e:
            print("Error connecting to the database:", str(e))

    def create_tables(self):
        #create cursor object
        cursor = self.conn.cursor()

        cursor.execute('''CREATE TABLE IF NOT EXISTS reviews
                        (review_id INTEGER PRIMARY KEY AUTOINCREMENT,
                        review_text VARCHAR(140) NOT NULL,
                        review_sentiment INTEGER NOT NULL CHECK (review_sentiment IN (0, 1)),
                        correct_classification INTEGER NOT NULL CHECK (correct_classification IN (0, 1)))''')

        self.conn.commit()
        cursor.close()

    def add_review(self, review, sentiment, correct):
        cursor = self.conn.cursor()
        # review is the review_text
        # sentiment is the review_sentiment
        # correct is the correct_classification

        print("hello WORLD")

        params = []
        query = "INSERT INTO reviews (review_text, review_sentiment, correct_classification) VALUES (?, ?, ?)"

        # check if review is below 140 characters and not null
        if not review or not isinstance(review, str) or len(review) > 140:
            return -1
        else:
            params.append(review)

        # check if sentiment is between 0 and 1
        if sentiment != 1 and sentiment != 0:
            return -1
        else:
            params.append(sentiment)

        # check if correct is between 0 and 1
        if correct != 1 and correct != 0:
            return -1
        else:
            params.append(correct)

        try:
            cursor.execute(query, params)
            print("review added to database")
        except sqlite3.Error as e:
            print("An error occurred attempting to add a review to the database: " + str(e))
            return -1
        finally:
            cursor.close()
            return 0


    def display_reviews(self):
        cursor = self.conn.cursor()

        try:
            cursor.execute("SELECT * FROM reviews")
            reviews = cursor.fetchall()

            for review in reviews:
                print(f"Review ID: {review[0]}, Text: {review[1]}, Sentiment: {review[2]}, Correct Classification: {review[3]}")

        except sqlite3.Error as e:
            print("An error occurred while retrieving reviews from the database: " + str(e))

        finally:
            cursor.close()