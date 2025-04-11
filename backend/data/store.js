const users = [
  {
    id: 1,
    name: 'Admin',
    email: 'admin@example.com',
    password: require('bcryptjs').hashSync('admin123', 10),
    role: 'admin',
  },
];

const feedbacks = [];

module.exports = { users, feedbacks };
