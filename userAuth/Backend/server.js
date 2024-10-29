const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Path to users.json file
const usersFilePath = path.join(__dirname, 'users.json');

// Read users from JSON file
const readUsers = () => {
  if (!fs.existsSync(usersFilePath)) {
    fs.writeFileSync(usersFilePath, JSON.stringify([]));
  }
  const data = fs.readFileSync(usersFilePath);
  return JSON.parse(data);
};

// Write users to JSON file
const writeUsers = (data) => {
  fs.writeFileSync(usersFilePath, JSON.stringify(data, null, 2));
};

// Route to get the content of users.json
app.get('/api/users', (req, res) => {
  const users = readUsers(); // Read users from the JSON file
  res.json(users); // Send users data as JSON response
});

// Register route
app.post('/api/signup', (req, res) => {
  const { username, password } = req.body;
  const users = readUsers();

  // Check if user already exists
  if (users.find((user) => user.username === username)) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Save new user
  users.push({ username, password });
  writeUsers(users);
  res.status(201).json({ message: 'User registered successfully' });
});

// Login route
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const users = readUsers();

  // Check if user exists
  const user = users.find((user) => user.username === username && user.password === password);
  if (user) {
    return res.status(200).json({ message: 'Login successful' });
  }

  res.status(400).json({ message: 'Invalid username or password' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});