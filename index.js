const searcher = require('./searcher.js');
const tester = require('./tester.js')
const express = require('express');
const app = express();
const port = 3000;






// Define a route to serve the HTML page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
  //res.render('display-json', searcher());
  console.log("MAIN PAGE")
  searcher();
});

app.get('/results.html', (req, res) => {
  res.sendFile(__dirname + '/public/results.html');

});

// Serve static files from the "public" directory
app.use(express.static('public'));



// Start the Express server
app.listen(port, () => {
  console.log(`http://localhost:3000`);
});

