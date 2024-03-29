const express = require('express');
const multer = require('multer');
const csvParser = require('csv-parser');
const fs = require('fs');

const app = express();
const port = 3000;

// Set up Multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Serve static files from the public directory
app.use(express.static('public'));

// Route to handle file upload
app.post('/upload', upload.single('csvFile'), (req, res) => {
    const filePath = req.file.path;
    const results = [];

    // Read and parse the CSV file
    fs.createReadStream(filePath)
        .pipe(csvParser())
        .on('data', (data) => {
            results.push(data);
        })
        .on('end', () => {
            // Send parsed CSV data as JSON response
            res.json(results);
            // Delete the uploaded file after parsing
            fs.unlinkSync(filePath);
        });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
