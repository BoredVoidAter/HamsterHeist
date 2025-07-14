const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the 'static' directory
app.use('/static', express.static(path.join(__dirname, '../static')));

// Serve frontend files
app.use('/frontend', express.static(path.join(__dirname, '../frontend')));

// Serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
