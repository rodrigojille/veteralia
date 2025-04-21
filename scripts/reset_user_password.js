const { Client } = require('pg');
const bcrypt = require('bcrypt');

const email = process.argv[2];
const newPassword = process.argv[3];

if (!email || !newPassword) {
  console.log('Usage: node reset_user_password.js <email> <newPassword>');
  process.exit(1);
}

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'veteralia',
  password: '140290', // Update if your DB password is different
  port: 5432,
});

async function resetPassword() {
  await client.connect();
  const hash = await bcrypt.hash(newPassword, 10);
  const res = await client.query(
    'UPDATE "user" SET password=$1 WHERE email=$2 RETURNING email',
    [hash, email]
  );
  if (res.rowCount === 1) {
    console.log(`Password for ${email} has been reset.`);
  } else {
    console.log(`User ${email} not found.`);
  }
  await client.end();
}

resetPassword().catch(e => {
  console.error(e);
  client.end();
});
