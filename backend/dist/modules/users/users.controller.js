"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./user.entity");
const passport_1 = require("@nestjs/passport");
let UsersController = class UsersController {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    async getMe(req) {
        if (!req.user || !req.user.id) {
            return { message: 'User not authenticated' };
        }
        const user = await this.userRepo.findOne({ where: { id: req.user.id } });
        if (!user)
            return { message: 'User not found' };
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone || '',
            role: user.role,
            language: user.language,
        };
    }
    async updateMe(req, body) {
        if (!req.user || !req.user.id) {
            return { message: 'User not authenticated' };
        }
        const user = await this.userRepo.findOne({ where: { id: req.user.id } });
        if (!user)
            return { message: 'User not found' };
        if (body.name !== undefined)
            user.name = body.name;
        if (body.email !== undefined)
            user.email = body.email;
        if (body.phone !== undefined)
            user.phone = body.phone;
        await this.userRepo.save(user);
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone || '',
            role: user.role,
            language: user.language,
        };
    }
    async findAll(role) {
        if (role === 'veterinarian') {
            const qb = this.userRepo.createQueryBuilder('user')
                .leftJoinAndSelect('user.vetProfile', 'profile')
                .where('user.role = :role', { role: 'veterinarian' });
            const users = await qb.getMany();
            return users.map((user) => {
                var _a, _b, _c;
                return ({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    language: user.language,
                    specialty: ((_a = user.vetProfile) === null || _a === void 0 ? void 0 : _a.specialty) || '',
                    available: !!((_b = user.vetProfile) === null || _b === void 0 ? void 0 : _b.schedule),
                    schedule: ((_c = user.vetProfile) === null || _c === void 0 ? void 0 : _c.schedule) || null,
                });
            });
        }
        return this.userRepo.find();
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Get)('me'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getMe", null);
__decorate([
    (0, common_1.Patch)('me'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateMe", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAll", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersController);
//# sourceMappingURL=users.controller.js.map