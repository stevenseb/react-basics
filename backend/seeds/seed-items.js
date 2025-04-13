import client from '../db.js';

const seedItems = async () => {
  const query = `
    INSERT INTO items (itemName, value, rare, forSale, originCountry)
    VALUES
      ('Ancient Vase', 5000, TRUE, TRUE, 'Egypt'),
      ('Vintage Watch', 1500, TRUE, FALSE, 'Switzerland'),
      ('Handmade Rug', 2000, FALSE, TRUE, 'Turkey'),
      ('Diamond Necklace', 10000, TRUE, TRUE, 'South Africa')
      -- Add more records here.
  `;
  
  try {
    await client.query(query);
    console.log('Items table seeded successfully!');
  } catch (err) {
    console.error('Error seeding items table:', err);
  } finally {
    client.end();
  }
};

seedItems();
