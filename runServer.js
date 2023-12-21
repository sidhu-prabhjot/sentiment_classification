const axios = require("axios");

// Example: Make a POST request to /predict endpoint in Flask server
const url = "http://127.0.0.1:4000/predict"; // Adjust the port if needed

async function predictReview() {
  try {
    const response = await axios.post(url, {
      examples: [
        "The movie was great!",
        "The movie was okay.",
        "The movie was terrible...",
      ],
    });
    console.log(response.data);
    const predictions = response.data.predictions.map(
      (prediction) => prediction[0]
    );

    for (let i = 0; i < predictions.length; i++) {
      if (predictions[i] > 0.5) {
        console.log("positive");
      } else {
        console.log("negative");
      }
    }
  } catch (error) {
    console.error("Error making prediction request:", error.message);
  }
}

// Now, execute the functions in order
(async () => {
  console.log(
    "***********************************************************************************"
  );
  await predictReview();
})();
