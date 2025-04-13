import express from 'express';
import { getUsers, getUserById, createUser, updateUser, deleteUser } from '../models/users.js';

const router = express.Router();

/**
 * Get all users.
 * @route GET /users
 * @returns {Array} - An array of user objects with camelCase properties.
 */
router.get('/', async (req, res) => {
  try {
    const users = await getUsers();
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve users' });
  }
});

/**
 * Get a single user by ID.
 * @route GET /users/:id
 * @returns {Object} - A single user object with camelCase properties.
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve user' });
  }
});

/**
 * Create a new user.
 * @route POST /users
 * @returns {Object} - The newly created user object with camelCase properties.
 */
router.post('/', async (req, res) => {
  try {
    const newUser = await createUser(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

/**
 * Update a user's information.
 * @route PUT /users/:id
 * @returns {Object} - The updated user object with camelCase properties.
 */
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await updateUser(id, req.body);

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found or no changes made' });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update user' });
  }
});

/**
 * Delete a user by ID.
 * @route DELETE /users/:id
 * @returns {Object} - Confirmation of deletion.
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await deleteUser(id);

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(deletedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

export default router;
