import client from '../db.js';

const unseedUsers = async () => {
  const query = `
    DELETE FROM users;
    ALTER SEQUENCE users_id_seq RESTART WITH 1;
  `;
  
  try {
    await client.query(query);
    console.log('Users table cleared successfully!');
  } catch (err) {
    console.error('Error clearing users table:', err);
  } finally {
    client.end();
  }
};

unseedUsers();
