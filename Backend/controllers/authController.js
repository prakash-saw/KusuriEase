const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

exports.signup = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 12);
  await User.create({ email, password: hashedPassword });

  res.status(201).json({ success: true, message: 'User registered successfully' });
});

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.status(200).json({ success: true, token });
});

exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return next(new ErrorResponse('No user found with that email', 404));

  const resetToken = crypto.randomBytes(32).toString('hex');
  user.resetToken = resetToken;
  user.resetTokenExpiry = Date.now() + 3600000; // 1 hour
  await user.save();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
  });

  const resetUrl = `${req.protocol}://${req.get('host')}/api/auth/reset-password/${resetToken}`;
  
  await transporter.sendMail({
    to: user.email,
    subject: 'Password Reset',
    html: `<p>You requested a password reset. Click <a href="${resetUrl}">here</a> to reset your password.</p>`
  });

  res.status(200).json({ success: true, data: 'Email sent' });
});

exports.resetPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({
    resetToken: req.params.token,
    resetTokenExpiry: { $gt: Date.now() }
  });

  if (!user) return next(new ErrorResponse('Invalid or expired token', 400));

  user.password = await bcrypt.hash(req.body.password, 12);
  user.resetToken = undefined;
  user.resetTokenExpiry = undefined;
  await user.save();

  res.status(200).json({ success: true, message: 'Password reset successful' });
});