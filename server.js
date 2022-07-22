const express = require('express');
const rateLimit = require('express-rate-limit')
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Connect database
(async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('MongoDB Connected');
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
})();

// Init middleware
// app.use(express.json({ extended: false }));
app.use(express.json({
  limit: '100mb'
}));
app.use(express.urlencoded({
  limit: '100mb',
  extended: true, 
  parameterLimit:50000
}));

// Create the rate limit rule
const apiRequestLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 1, // limit each IP to 2 requests per windowMs
  handler: function (req, res, /*next*/) {
    return res.status(400).json('Anda sudah mendapatkan hadiah, tidak boleh merefresh halaman')
}
})

// Use the limit rule as an application middleware
// app.use(apiRequestLimiter)

// Define routes
app.use('/api/participants', require('./routes/api/participants'));
app.use('/api/doorprize', require('./routes/api/doorprize'))
app.use('/api/auth', require('./routes/api/auth'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 2400;

app.listen(PORT, () => console.log('Server started on port ' + PORT));
