const express = require('express');
const dotenv = require('dotenv');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
const bmiRoutes = require('./routes/BMIRoutes');
const pharmacyRoutes = require('./routes/pharmacyRoutes');
const medicationRoutes = require('./routes/medicationRoutes');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// --- Security Middleware ---
app.use(helmet()); // Set security headers
app.use(cors());   // Enable CORS
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Mount routers
const auth = require('./routes/authRoutes');
const { validateSignup, validateLogin } = require('./middleware/validator');

// Attach validation to routes directly or in route file
app.post('/api/auth/signup', validateSignup, require('./controllers/authController').signup);
app.post('/api/auth/login', validateLogin, require('./controllers/authController').login);
app.use('/api/auth', auth);
app.use('/api/bmi', bmiRoutes);
app.use('/api/pharmacies', pharmacyRoutes);
app.use('/api/medications', medicationRoutes);

// Error Handler Middleware (MUST be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server locked and loaded on port ${PORT}`));