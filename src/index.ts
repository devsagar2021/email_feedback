import express from 'express';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import passport from 'passport';
import cors from 'cors';

import keys from './config/getKeys';
import billingRoutes from './routes/billingRoutes';
import authRoutes from './routes/authRoutes';
import './models/User';
import './models/Surveys';
import './services/passport';
import surveyRoutes from './routes/surveyRoutes';

mongoose.connect(keys.mongoURI);

const app = express();

// Middlewares
app.use(cors({
  'allowedHeaders': ['Content-Type'],
  'origin': '*',
  'preflightContinue': true
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cookieSession({
    maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day in milliseconds
    keys: [keys.cookieKey],
  })
)
app.use(passport.initialize());
app.use(passport.session());

// routes
authRoutes(app);
billingRoutes(app);
surveyRoutes(app);

// Production: Serve client
if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  app.use(express.static('client/dist'));

  // Express will serve up the index.html file if it doesn't recognize the route
  const path = require('path');
  app.get('*', (_req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'dist', 'index.html'));
  });
}

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
