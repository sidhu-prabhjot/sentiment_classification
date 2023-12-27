from http.server import BaseHTTPRequestHandler, HTTPServer
import json
import tensorflow as tf
from review_data_sql import Database

# Load the TensorFlow model
loaded_model = tf.saved_model.load("sentiment_model")

# Assuming your model signature name is 'serving_default'
inference_func = loaded_model.signatures["serving_default"]
print("*****keys: ", str(loaded_model.signatures.keys()), "*****")

db = Database(reset=True)
db.create_tables()

class PredictionHandler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(200, "OK")
        self.send_header("Access-Control-Allow-Origin", "http://localhost:3000")  # Allow requests from any origin (replace with your front-end URL in production)
        self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        data = json.loads(post_data.decode('utf-8'))

        if not data or 'examples' not in data:
            self.send_response(400)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'error': 'Invalid input format'}).encode('utf-8'))
            return

        examples = data['examples']
        print(examples)

        # Make predictions using the specific signature
        predictions = inference_func(text_vectorization_input=tf.constant(examples))
        print(predictions)

        # Extract the output tensor (assuming a single output)
        output_tensor = predictions['activation'].numpy()  # Replace with the actual name of your output tensor
        print(output_tensor)

        # Assuming a binary classification, you might want to return probabilities or classes
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', 'http://localhost:3000') 
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps({'predictions': output_tensor.tolist()}).encode('utf-8'))

if __name__ == '__main__':
    server_address = ('', 4000)
    httpd = HTTPServer(server_address, PredictionHandler)
    print('Starting server on port 4000...')
    httpd.serve_forever()
