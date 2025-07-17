const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

const app = express();
const port = 3000;

app.use(express.json()); // for parsing JSON bodies

// Swagger UI route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Sample in-memory data
let users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
];

// Root route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// CRUD Routes

// Get all users
app.get('/users', (req, res) => {
  res.json(users);
});

// Get user by ID
app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id == req.params.id);
  if (user) res.json(user);
  else res.status(404).json({ error: 'User not found' });
});

// Create a new user
app.post('/users', (req, res) => {
  const { name } = req.body;
  const newUser = { id: users.length + 1, name };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Update a user
app.put('/users/:id', (req, res) => {
  const user = users.find(u => u.id == req.params.id);
  if (user) {
    user.name = req.body.name;
    res.json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// Delete a user
app.delete('/users/:id', (req, res) => {
  const index = users.findIndex(u => u.id == req.params.id);
  if (index > -1) {
    const deleted = users.splice(index, 1);
    res.json(deleted[0]);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
