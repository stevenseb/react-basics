import pg from "pg";

const { Client } = pg;

import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const client = new Client({

host: process.env.DB_HOST,

port: process.env.DB_PORT,

user: process.env.DB_USER,

password: process.env.DB_PASSWORD,

database: process.env.DB_NAME,

});

try {
  await client.connect();
  console.log("Connected to PostgreSQL database");
} catch (error) {
  console.error("Error connecting to PostgreSQL:", error);
}

export default client;
