const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Anoushka_1710",
  database: "medicycle"
});

db.connect(err => {
  if (err) console.log(err);
  else console.log("MySQL Connected");
});

module.exports = db;