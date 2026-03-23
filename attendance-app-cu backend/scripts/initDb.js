require("dotenv").config();

const fs = require("fs");
const path = require("path");
const { Client } = require("pg");

async function initDb() {
  const connectionString = process.env.SUPABASE_DB_URL;

  if (!connectionString) {
    console.error(
      "Missing SUPABASE_DB_URL in attendance-app-cu backend/.env. " +
        "Use the direct Postgres connection string from your Supabase project.",
    );
    process.exit(1);
  }

  const schemaPath = path.join(__dirname, "..", "db", "schema.sql");
  const sql = fs.readFileSync(schemaPath, "utf8");

  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();
    await client.query(sql);
    console.log("Database schema initialized successfully.");
  } catch (error) {
    console.error("Failed to initialize database schema.");
    console.error(error.message);
    process.exitCode = 1;
  } finally {
    await client.end();
  }
}

initDb();
