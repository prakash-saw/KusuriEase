# KusuriEase

Professional Authentication Backend

A production-ready Express & MongoDB authentication system.

Setup

Install new dependencies:

npm install express mongoose bcryptjs jsonwebtoken nodemailer dotenv helmet cors express-rate-limit express-validator


File Structure:

/
├── config/db.js
├── controllers/authController.js
├── middleware/
│   ├── async.js      # Wraps async routes
│   ├── error.js      # Global error handler
│   └── validator.js  # Request validation logic
├── models/User.js
├── routes/authRoutes.js
├── utils/errorResponse.js
├── server.js
└── .env


Running:

For development: npx nodemon server.js

For production: node server.js

Security Features Included:

Helmet: Shields your app from well-known web vulnerabilities by setting HTTP headers appropriately.

CORS: Configured for cross-origin resource sharing.

Rate Limiting: Prevents brute-force login attempts.

Sanitization: express-validator ensures no malicious or malformed data enters the database.

Centralized Errors: No more leaking stack traces to the client.


//////



How to Save and Run this Project

Step 1: Create the Folder Structure

Create a new folder on your computer (e.g., auth-backend). Inside that folder, create the following subfolders exactly as shown:

config

controllers

middleware

models

routes

utils

Step 2: Save the Files

Copy each code block provided above and save it into the corresponding file name and path mentioned at the top of the block.

Step 3: Create the .env File

In the root folder (the auth-backend folder), create a file named .env and paste this:

PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/auth_db
JWT_SECRET=yoursupersecretkey123
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password


Step 4: Install Dependencies

Open your terminal in the root folder and run:

npm init -y
npm install express mongoose bcryptjs jsonwebtoken nodemailer dotenv helmet cors express-rate-limit express-validator


Step 5: Start the Server

Run the following command:

node server.js


Tip: Install nodemon (npm install -g nodemon) and run nodemon server.js to automatically restart the server when you save changes.

Testing

Use Postman to send requests:

Signup: POST http://localhost:5000/api/auth/signup

Login: POST http://localhost:5000/api/auth/login