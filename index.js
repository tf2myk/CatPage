const searchcats = require('./searchcats.js')
const express = require('express');;
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;




/// Image Uploading

const multer = require('multer');
const { Storage } = require('@google-cloud/storage');
const path = require('path');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });




// Google Cloud Storage configuration
const storageClient = new Storage({
  keyFilename: 'keys/catkey.json', // Replace with your JSON key file path
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
      res.status(500).json({ error: 'Error uploading image on index.js' });
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
  console.log("MAIN PAGE")
});

app.get('/results', (req, res) => {
  res.sendFile(__dirname + '/public/results.html');
  console.log("results loaded");
});



app.post('/api/data', async(req, res) => {
  const receivedData = req.body.data;
  console.log(`Searching with ${receivedData}`);
  //let cleaned = receivedData.replace(/\s/g, '%')
  //console.log(` The cleaned link is: ${cleaned}`)
  const response = await searchcats(receivedData);
  //console.log(response);
  res.json(response);
});


// Serve static files from the "public" directory
app.use(express.static(__dirname + '/public'));



// Start the Express server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

