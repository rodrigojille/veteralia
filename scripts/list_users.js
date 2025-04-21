const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'veteralia',
  password: '140290', // Update if your DB password is different
  port: 5432,
});

async function listUsers() {
  await client.connect();
  const res = await client.query('SELECT id, email, role FROM "user"');
  console.table(res.rows);
  await client.end();
}

listUsers().catch(e => {
  console.error(e);
  client.end();
});
