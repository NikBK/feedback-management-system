const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { users } = require('../data/store');

const ADMIN_EMAILS = ['admin@example.com'];

const signup = (req, res) => {
  const { name, email, password } = req.body;
  const exists = users.find((u) => u.email === email);
  if (exists) return res.status(400).json({ message: 'User already exists' });

  const hashed = bcrypt.hashSync(password, 10);
  const isAdmin = ADMIN_EMAILS.includes(email);
  const user = {
    id: Date.now(),
    name,
    email,
    password: hashed,
    role: isAdmin ? 'admin' : 'user',
  };
  users.push(user);

  res.status(201).json({ message: 'User registered successfully' });
};

const login = (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    'secret',
    {
      expiresIn: '1d',
    }
  );

  res.json({ token });
};

module.exports = { signup, login };
