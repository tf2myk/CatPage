const searchcats = require('./searchcats.js')
const express = require('express');
const app = express();
const port = 3000;

const SerpApi = require('google-search-results-nodejs');
const search = new SerpApi.GoogleSearch("a45a008dfe93a8dbb1fd1f4d404720a2e57491f04284e5c854de0ed2ef3c5f8d");

  const params = {
    engine: "google_lens",
    url: "https://i.imgur.com/HBrB8p0.png"
  };

  const callback = function(data) {
    var apidata = data;
    return apidata;
  };

// Define a route to serve the HTML page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
  //res.render('display-json', searcher());
  console.log("MAIN PAGE")
  //searcher();
  //console.log(global.jsonthing)

});

app.get('/results.html', (req, res) => {
  res.sendFile(__dirname + '/public/results.html');

});

app.get('/testfile2.html', (req, res) => {
  res.sendFile(__dirname + '/testfile2.html');
  
  console.log("test file loaded");

});



app.get('/api/data', async(req, res) => {
  const response = await searchcats();
  //console.log(response);
  res.json(response);
});


// Serve static files from the "public" directory
app.use(express.static('public'));



// Start the Express server
app.listen(port, () => {
  console.log(`http://localhost:3000`);
});

