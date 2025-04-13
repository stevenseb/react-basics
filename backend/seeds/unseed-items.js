import client from '../db.js';

const unseedItems = async () => {
  const query = `
    DELETE FROM items;
    ALTER SEQUENCE items_id_seq RESTART WITH 1;
  `;
  
  try {
    await client.query(query);
    console.log('Items table cleared successfully!');
  } catch (err) {
    console.error('Error clearing items table:', err);
  } finally {
    client.end();
  }
};

unseedItems();
