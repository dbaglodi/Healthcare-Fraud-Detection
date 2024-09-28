const fs = require('fs');
const express = require('express');
const app = express();
const port = 3000;

// File path for the JSON file
const jsonFilePath = './fraud_predictions.json'; // Adjust the path if needed

// Read the JSON file
app.get('/api/data', (req, res) => {
  fs.readFile(jsonFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading the file');
    }
    res.json(JSON.parse(data));
  });
});

// Edit the JSON file
app.post('/api/data', (req, res) => {
  const newData = req.body;
  fs.writeFile(jsonFilePath, JSON.stringify(newData, null, 2), (err) => {
    if (err) {
      return res.status(500).send('Error writing the file');
    }
    res.send('File updated successfully');
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});