const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8080;
const fs = require('fs');

const dataFilePath = '/app/data/savedData.txt';


// Use body-parser middleware to parse JSON in the request body
app.use(bodyParser.json());

// POST request to save a String to the volume
app.post('/saveString', (req, res) => {
  if (!req.body.data) {
    return res.status(400).send('Data field is missing in the request.');
  }

  const savedString = req.body.data;

  // Write the received data to a file located in a volume
  fs.writeFile(dataFilePath, savedString, (err) => {
    if (err) {
      console.error('Error writing to the file:', err);
      return res.status(500).send('Error while saving data to the file.');
    }
    console.log('Data saved to the file:', savedString);
    res.sendStatus(200);
  });
});


// GET request to get the "saved" string from the volume
app.get('/getString', (req, res) => {
  try {
    // Read from the file to simulate reading from a volume
    const savedString = fs.readFileSync(dataFilePath, 'utf-8');
    res.send(savedString);
  } catch (error) {
    res.status(404).send('Not Found');
  }
});

// GET request to make the CPU busy for 3 minutes
app.get('/busywait', (req, res) => {
  const startTime = new Date().getTime();
  const duration = 3 * 60 * 1000; // 3 minutes

  // Perform CPU-intensive operation
  while (new Date().getTime() - startTime < duration) {
    // Busy wait
  }
  res.sendStatus(200);
});

// Define a route that responds to GET requests for "/isAlive"
app.get('/isAlive', (req, res) => {
  res.status(200).json(true);
});

// General testing
app.get('/hello', (req, res) => { 
  res.send(`Hi there!`);

});


const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));
