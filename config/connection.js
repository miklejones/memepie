const mysql = require(`mysql`)
require(`dotenv`).load();
let connection;

if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  connection = mysql.createConnection({
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE
  })
};

connection.connect(err => {
  if (err) {
    console.error(`Congratulations, you've played yourself: ${err.stack}`);
    return;
  }
  console.log(`You've connected successfully: ${connection.threadId}`)
});

module.exports = connection;