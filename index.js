const express = require('express');
const app = express();
const port = 3000;

// Serve static files from the "public" directory
app.use(express.static('public'));

// Define a route to serve the HTML page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/results', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Start the Express server
app.listen(port, () => {
  console.log(`http://localhost:3000`);
});

