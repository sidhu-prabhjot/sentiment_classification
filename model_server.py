from flask import Flask, request, jsonify
import tensorflow as tf

app = Flask(__name__)

# Load the TensorFlow model
loaded_model = tf.saved_model.load("sentiment_model")

# Assuming your model signature name is 'serving_default'
inference_func = loaded_model.signatures["serving_default"]
print("*****keys: ", str(loaded_model.signatures.keys()), "*****")

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        print(data)
        if not data or 'examples' not in data:
            return jsonify({'error': 'Invalid input format'}), 400

        examples = data['examples']
        print(examples)

        # Make predictions using the specific signature
        predictions = inference_func(text_vectorization_input=tf.constant(examples))

        print(predictions)

        # Extract the output tensor (assuming a single output)
        output_tensor = predictions['activation'].numpy()  # Replace with the actual name of your output tensor
        print(output_tensor)

        # Assuming a binary classification, you might want to return probabilities or classes
        return jsonify({'predictions': output_tensor.tolist()})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    # Use a production-ready server like Gunicorn
    app.run(debug=True, port=4000)
