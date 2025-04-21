const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'veteralia',
  password: '140290', // Update if your DB password is different
  port: 5432,
});

const testUserPasswords = {
  // Fill this mapping with your known test users and their passwords
  // 'test@example.com': 'password123',
};

async function listUsers() {
  await client.connect();
  const res = await client.query('SELECT id, email, role, password FROM "user"');
  const usersWithPlain = res.rows.map(u => ({
    id: u.id,
    email: u.email,
    role: u.role,
    password: u.password,
    plain_password: testUserPasswords[u.email] || 'UNKNOWN',
  }));
  console.table(usersWithPlain);
  await client.end();
}

listUsers().catch(e => {
  console.error(e);
  client.end();
});
