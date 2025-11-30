require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const authRouter = require('./router/auth-router');
const connectDB = require('./utils/db');

// Allow all origins for development to avoid CORS issues
const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

app.get('/', (req, res) => {
  res.status(200).send('FitMatrix Backend is Running');
});

app.use("/api/auth", authRouter);
app.use("/api/profile", require('./router/profile-router'));
app.use("/api/workout", require('./router/workout-router'));
app.use("/api/diet", require('./router/diet-router'));
app.use("/api/dashboard", require('./router/dashboard-router'));

connectDB()
  .then(() => {
    // Listen on 0.0.0.0 to accept connections from all interfaces
    app.listen(3000, '0.0.0.0', () => {
      console.log('Server is running on http://localhost:3000');
    });
  })
  .catch((error) => {
    console.error('Failed to connect to the database:', error);
  });