const { Pool } = require("pg");
require("dotenv").config();

// module.exports = new Pool({
//   connectionString: process.env.DB_CONNECTION_STRING,
// });

module.exports = new Pool({
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  ssl: true,
});
