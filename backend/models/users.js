import client from '../db.js'; // PostgreSQL client
import { hashPassword, verifyPassword } from '../utils/bcrypt.js'; // Bcrypt utilities

/**
 * Create a new user with hashed password.
 * @param {Object} userData - The user data to insert.
 * @param {string} userData.firstName - The user's first name.
 * @param {string} userData.lastName - The user's last name.
 * @param {string} userData.email - The user's email address.
 * @param {string} userData.password - The plain-text password to hash.
 * @returns {Promise<Object>} - The newly created user record.
 */
export const createUser = async (userData) => {
  const { firstName, lastName, email, password } = userData;

  // Hash the plain-text password before storing it
  const hashedPassword = await hashPassword(password);

  const result = await client.query(
    `INSERT INTO users (firstname, lastname, email, password)
     VALUES ($1, $2, $3, $4)
     RETURNING id, firstname AS "firstName", lastname AS "lastName", email`,
    [firstName, lastName, email, hashedPassword]
  );

  return result.rows[0]; // Return transformed data directly
};

/**
 * Verify user login credentials.
 * @param {string} email - The user's email address.
 * @param {string} plainPassword - The plain-text password to verify.
 * @returns {Promise<Object>} - The verified user record if credentials are correct.
 */
export const verifyUser = async (email, plainPassword) => {
  try {
    // Fetch the user by email
    const result = await client.query(
      `SELECT id, firstname AS "firstName", lastname AS "lastName", email, password FROM users WHERE email = $1`,
      [email]
    );

    if (result.rows.length === 0) {
      throw new Error('User not found');
    }

    const user = result.rows[0];

    // Verify the plain-text password against the hashed password
    const isValidPassword = await verifyPassword(plainPassword, user.password);

    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    }

    // Remove sensitive data before returning
    delete user.password;
    return user;
  } catch (error) {
    throw error;
  }
};

/**
 * Get all users (for testing or admin purposes).
 * @returns {Promise<Array>} - An array of all users in the database.
 */
export const getUsers = async () => {
  const result = await client.query(
    `SELECT id, firstname AS "firstName", lastname AS "lastName", joindate AS "joinDate", contributor, promember AS "proMember" FROM users`
  );

  return result.rows; // Return transformed data directly
};

/**
 * Get a single user by ID.
 * @param {number} id - The user's ID.
 * @returns {Promise<Object>} - The user's record if found.
 */
export const getUserById = async (id) => {
  try {
    const result = await client.query(
      `SELECT id, firstname AS "firstName", lastname AS "lastName", email FROM users WHERE id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      throw new Error('User not found');
    }

    return result.rows[0]; // Return transformed data directly
  } catch (error) {
    throw error;
  }
};

/**
 * Update a user's information.
 * @param {number} id - The user's ID to update.
 * @param {Object} updates - Key-value pairs of fields to update.
 * @returns {Promise<Object>} - The updated user record.
 */
export const updateUser = async (id, updates) => {
  const fields = Object.keys(updates);
  const values = Object.values(updates);

  // Dynamically build the SET clause for the query
  const setClause = fields.map((field, index) => `${field} = $${index + 1}`).join(', ');

  const query = `
    UPDATE users
    SET ${setClause}
    WHERE id = $${fields.length + 1}
    RETURNING id, firstname AS "firstName", lastname AS "lastName", email;
  `;

  const result = await client.query(query, [...values, id]);

  if (result.rows.length === 0) {
    throw new Error('User not found or no changes made');
  }

  return result.rows[0]; // Return transformed data directly
};

/**
 * Delete a user by ID.
 * @param {number} id - The user's ID to delete.
 * @returns {Promise<Object>}
 */
export const deleteUser = async (id) => {
  const result = await client.query(`DELETE FROM users WHERE id = $1 RETURNING id`, [id]);

  if (result.rowCount === 0) {
    throw new Error('User not found');
  }

  return result.rows[0]; // Return transformed data directly
};
