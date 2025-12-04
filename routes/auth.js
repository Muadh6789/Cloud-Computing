
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Models/user');
const router = express.Router();

router.post('/register', async (req, res) => {
  // Registration logic
});

router.post('/login', async (req, res) => {
  // Login logic
});

module.exports = router;
