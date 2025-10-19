// Sample vulnerable code for testing CodeGuardian
// This file contains SQL injection vulnerabilities

const express = require('express');
const mysql = require('mysql');

const app = express();
const db = mysql.createConnection({
  host: 'localhost',
  user: 'admin',
  password: 'password123',  // Hardcoded password - security issue!
  database: 'users_db'
});

// VULNERABILITY: SQL Injection
app.get('/user', (req, res) => {
  const userId = req.query.id;

  // Direct string concatenation - vulnerable to SQL injection!
  const query = "SELECT * FROM users WHERE id = '" + userId + "'";

  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// VULNERABILITY: SQL Injection with user input
app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // Another SQL injection vulnerability
  const query = `SELECT * FROM users WHERE username='${username}' AND password='${password}'`;

  db.query(query, (err, results) => {
    if (err) throw err;

    if (results.length > 0) {
      // VULNERABILITY: Storing sensitive data in plain text
      res.cookie('session', username);
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  });
});

// VULNERABILITY: Exposed API key
const API_KEY = 'sk-1234567890abcdef';

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
