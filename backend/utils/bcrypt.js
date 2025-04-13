import bcrypt from 'bcrypt';

// Number of salt rounds for hashing (higher is more secure but slower)
const SALT_ROUNDS = 10;

/**
 * Hashes a plain-text password.
 * @param {string} password - The plain-text password.
 * @returns {Promise<string>} - The hashed password.
 */
export const hashPassword = async (password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    return hashedPassword;
  } catch (err) {
    console.error('Error hashing password:', err);
    throw err;
  }
};

/**
 * Compares a plain-text password with a hashed password.
 * @param {string} password - The plain-text password.
 * @param {string} hashedPassword - The hashed password from the database.
 * @returns {Promise<boolean>} - True if the passwords match, otherwise false.
 */
export const verifyPassword = async (password, hashedPassword) => {
  try {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  } catch (err) {
    console.error('Error verifying password:', err);
    throw err;
  }
};
