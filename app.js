const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// App Initialization
const app = express();

// MongoDB Connection
const connectDB = require('./config/db');
connectDB();

// Middlewares
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use(express.static(path.join(__dirname, 'public')));


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// Backend Routes
app.use('/api/faqs', require('./routes/faqRoutes'));
app.use('/api/guide-categories', require('./routes/guide/guideCategoryRoutes'));
app.use('/api/guides', require('./routes/guide/guideContentRoutes'));
app.use('/api/video-categories', require('./routes/video/videoCategoryRoutes'));
app.use('/api/videos', require('./routes/video/videoRoutes'));

const frontendRoutes = require('./routes/frontendRoutes');
app.use('/', frontendRoutes);



// Global Error Handler
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
