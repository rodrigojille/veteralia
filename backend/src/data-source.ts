import { DataSource } from 'typeorm';
import { User } from './modules/users/user.entity'
import { VetProfile } from './modules/vet-profile/vet-profile.entity';
// import other entities as needed

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '140290', // update as needed
  database: 'veteralia',
  entities: [User, VetProfile], // add all your entities here
  migrations: ['migrations/*.ts'],
  synchronize: false,
});
