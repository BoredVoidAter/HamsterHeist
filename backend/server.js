const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const scriptRoutes = require('./routes/script_routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // For parsing application/json

// Connect to MongoDB
mongoose.connect('mongodb://localhost/hamsterheist', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));

// Use API routes
app.use('/api', scriptRoutes);

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
