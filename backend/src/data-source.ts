import { DataSource } from 'typeorm';
import { User } from './modules/users/user.entity'
import { VetProfile } from './modules/vet-profile/vet-profile.entity';
// import other entities as needed

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, VetProfile], // add all your entities here
  migrations: ['migrations/*.ts'],
  synchronize: false,
});
