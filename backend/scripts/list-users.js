// Usage: node scripts/list-users.js
// Prints all users (id, email, role) from the PostgreSQL database using TypeORM config

require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const { createConnection } = require('typeorm');

(async () => {
  try {
    const connection = await createConnection({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [require(require('path').resolve(__dirname, '../dist/modules/users/user.entity.js')).User],
      synchronize: false,
      logging: false,
    });
    const users = await connection.getRepository('user').find({ select: ['id', 'email', 'role', 'password'] });
    console.table(users);
    await connection.close();
  } catch (err) {
    console.error('Error listing users:', err);
    process.exit(1);
  }
})();
