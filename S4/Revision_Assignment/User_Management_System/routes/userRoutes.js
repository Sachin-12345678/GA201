const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { authenticateToken } = require('../middleware/authMiddleware');


// Fetch User Details API-->
router.get('/details', authenticateToken, async (req, res) => {
    try {
      const userId = req.user.userId;
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(501).json({ status: 501, message: 'User not found' });
      }
  
      res.status(200).json({
        status: 200,
        data: {
          id: user._id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          mobile: user.mobile,
          role: user.role,
          status: user.status,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 500, message: 'Internal Server Error' });
    }
  });


   // Filter Users API-->
   router.get('/', async (req, res) => {
    try {
      const { name, email, mobile, status, role } = req.query;
  
      const filter = {};
      if (name) {
        filter.$or = [
          { first_name: new RegExp(name, 'i') },
          { last_name: new RegExp(name, 'i') },
        ];
      }
      if (email) filter.email = email;
      if (mobile) filter.mobile = mobile;
      if (status) filter.status = status;
      if (role) filter.role = role;
  
      const users = await User.find(filter);
  
      res.status(200).json({
        status: 200,
        data: users.map(user => ({
          id: user._id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          mobile: user.mobile,
          role: user.role,
          status: user.status,
        })),
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 500, message: 'Internal Server Error' });
    }
  });
  


// User Registration-->
router.post('/register', async (req, res) => {
  try {
    const { first_name, last_name, email, mobile, password, role, status } = req.body;

    const existingUser = await User.findOne({ $or: [{ email }, { mobile }] });
    if (existingUser) {
      return res.status(501).json({ status: 501, message: 'Email or mobile number already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      first_name,
      last_name,
      email,
      mobile,
      password: hashedPassword,
      role,
      status,
    });

    await newUser.save();

    res.status(200).json({ status: 200, message: 'Account successfully created' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, message: 'Internal Server Error' });
  }
});


// User Login-->
router.post('/login', async (req, res) => {
    try {
      const { email, password, role } = req.body;
  
      const user = await User.findOne({ email, role });
      if (!user) {
        return res.status(501).json({ status: 501, message: 'Email not found' });
      }
  
      // Validate password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(501).json({ status: 501, message: 'Invalid password' });
      }
  
      const token = jwt.sign({ userId: user._id, role: user.role }, 'secret', { expiresIn: '30d' });
  
      res.status(200).json({
        status: 200,
        message: 'Logged in successfully',
        data: {
          userDetails: {
            id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            mobile: user.mobile,
            role: user.role,
            status: user.status,
          },
          token,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 500, message: 'Internal Server Error' });
    }
  });
  

module.exports = router;
