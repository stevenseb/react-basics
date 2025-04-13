import client from '../db.js';

const seedUsers = async () => {
  const query = `
    INSERT INTO users (firstName, lastName, gender, proMember, contributor, city, profession, age, email, avatar, password)
    VALUES
      ('John', 'Doe', 'Male', TRUE, FALSE, 'New York', 'Engineer', 30, 'john.doe@example.com', 'https://example.com/avatar1.jpg', 'hashedPassword1'),
      ('Jane', 'Smith', 'Female', TRUE, TRUE, 'Los Angeles', 'Designer', 28, 'jane.smith@example.com', 'https://example.com/avatar2.jpg', 'hashedPassword2'),
      ('Alice', 'Johnson', 'Female', FALSE, TRUE, 'Chicago', 'Teacher', 35, 'alice.johnson@example.com', 'https://example.com/avatar3.jpg', 'hashedPassword3'),
      ('Bob', 'Brown', 'Male', TRUE, FALSE, 'Houston', 'Doctor', 40, 'bob.brown@example.com', 'https://example.com/avatar4.jpg', 'hashedPassword4')
      -- Add more records here.
  `;
  
  try {
    await client.query(query);
    console.log('Users table seeded successfully!');
  } catch (err) {
    console.error('Error seeding users table:', err);
  } finally {
    client.end();
  }
};

seedUsers();
