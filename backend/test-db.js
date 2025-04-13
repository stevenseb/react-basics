import client from "./db.js";

(async () => {
  try {

    // Perform a test query
    const result = await client.query("SELECT NOW() AS current_time");
    console.log("Database response:", result.rows);

    // Close the connection
    await client.end();
  } catch (error) {
    console.error("Error testing database connection:", error);
  }
})();
