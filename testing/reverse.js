// Define a function that encapsulates your code
function performImageMatching() {
  const apiKey = 'AIzaSyDB7Oc-bGSmGoFZeeBciKjWQSKJvM1-gWc';
  const apiUrl = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;
  const imageUrl = 'gs://cata_test_1/Horizontal.jpg';

  const requestData = {
    requests: [
      {
        image: {
          source: {
            imageUri: imageUrl
          }
        },
        features: [
          {
            type: 'WEB_DETECTION'
          }
        ]
      }
    ]
  };

  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestData)
  })
    .then(response => response.json())
    .then(data => {
      // Handle the API response here
      console.log(data);
    })
    .catch(error => {
      // Handle errors
      console.error('Error:', error);
    });
}

// Call the function when the page is ready
document.addEventListener('DOMContentLoaded', performImageMatching);