const { Client } = require('pg');
const bcrypt = require('bcryptjs');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'veteralia',
  password: '140290', // Update if your DB password is different
  port: 5432,
});

async function resetAllPasswords() {
  await client.connect();
  const newPassword = 'test1234';
  const hash = await bcrypt.hash(newPassword, 10);
  await client.query('UPDATE "user" SET password = $1', [hash]);
  console.log('All user passwords have been reset to:', newPassword);
  await client.end();
}

resetAllPasswords().catch(e => {
  console.error(e);
  client.end();
});
