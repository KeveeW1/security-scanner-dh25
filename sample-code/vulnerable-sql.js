const express = require("express");
const mysql = require("mysql");

const app = express();
const db = mysql.createConnection({
  host: "localhost",
  user: "admin",
  password: "password123",
  database: "users_db",
});

app.get("/user", (req, res) => {
  const userId = req.query.id;

  const query = "SELECT * FROM users WHERE id = '" + userId + "'";

  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const query = `SELECT * FROM users WHERE username='${username}' AND password='${password}'`;

  db.query(query, (err, results) => {
    if (err) throw err;

    if (results.length > 0) {
      res.cookie("session", username);
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  });
});

const API_KEY = "sk-1234567890abcdef";

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
