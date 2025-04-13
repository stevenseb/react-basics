import express from 'express';
import { createUser, verifyUser } from '../models/users.js';

const router = express.Router();

// Signup route
router.post('/signup', async (req, res) => {
  try {
    const newUser = await createUser(req.body);
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await verifyUser(email, password);
    res.status(200).json({ message: 'Login successful', user });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});

export default router;
