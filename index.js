const searchcats = require('./searchcats.js')
const express = require('express');;
const app = express();
const port = 3000;


/// Image Uploading

const multer = require('multer');
const { Storage } = require('@google-cloud/storage');
const path = require('path');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });




// Google Cloud Storage configuration
const storageClient = new Storage({
  keyFilename: 'keys\catkey.json', // Replace with your JSON key file path
});

const bucketName = 'cata_test_1';

app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      res.status(400).json({ error: 'No image file provided' });
      return;
    }

    const blob = storageClient.bucket(bucketName).file(file.originalname);
    const blobStream = blob.createWriteStream();

    blobStream.on('error', (err) => {
      res.status(500).json({ error: 'Error uploading image' });
    });

    blobStream.on('finish', () => {
      const imageUrl = `https://storage.googleapis.com/${bucketName}/${file.originalname}`;
      res.json({ imageUrl });
    });

    blobStream.end(file.buffer);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

///


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

