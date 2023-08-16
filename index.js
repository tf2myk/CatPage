const searchcats = require('./searchcats.js')
const express = require('express');
const app = express();
const port = 3000;


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

app.get('/chatgal', async(req, res) => {
  res.sendFile(__dirname + '/public/chatgal.html');
  
  console.log("chatgal loaded");
});



app.get('/api/data', async(req, res) => {
  const response = await searchcats();
  //console.log(response);
  res.json(response);
});


// Serve static files from the "public" directory
app.use(express.static(__dirname + '/public'));



// Start the Express server
app.listen(port, () => {
  console.log(`http://localhost:3000`);
});

