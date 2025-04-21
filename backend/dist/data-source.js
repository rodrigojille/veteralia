"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./modules/users/user.entity");
const vet_profile_entity_1 = require("./modules/vet-profile/vet-profile.entity");
exports.default = new typeorm_1.DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '140290',
    database: 'veteralia',
    entities: [user_entity_1.User, vet_profile_entity_1.VetProfile],
    migrations: ['migrations/*.ts'],
    synchronize: false,
});
//# sourceMappingURL=data-source.js.map