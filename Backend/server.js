// server.js
const express = require('express');
const mongoose = require('mongoose');
const itemRoutes = require('./routes/itemRoutes');
const sharedRoutes = require('./routes/sharedRoutes');
const cors = require('cors');
require('dotenv').config();
const app = express();
const PORT = 3001;
app.use(cors());

// Connect to MongoDB Atlas
mongoose.connect("mongodb+srv://tusharawasthi722:W8dElii2cyAeR0ie@developmentcluster.ar6hbsi.mongodb.net/?retryWrites=true&w=majority&appName=DevelopmentCluster", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

// Middleware
app.use(express.json());

// Routes
app.use('/api', itemRoutes);
app.use('/share',sharedRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
