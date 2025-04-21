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
exports.VetProfileService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const vet_profile_entity_1 = require("./vet-profile.entity");
let VetProfileService = class VetProfileService {
    constructor(vetProfileRepo) {
        this.vetProfileRepo = vetProfileRepo;
    }
    async createOrUpdate(user, data) {
        try {
            let profile = await this.vetProfileRepo.createQueryBuilder('profile')
                .leftJoinAndSelect('profile.user', 'user')
                .where('user.id = :userId', { userId: user.id })
                .getOne();
            if (!profile) {
                profile = this.vetProfileRepo.create(Object.assign(Object.assign({}, data), { user }));
            }
            else {
                Object.assign(profile, data);
            }
            return await this.vetProfileRepo.save(profile);
        }
        catch (err) {
            console.error('VetProfile createOrUpdate error:', err);
            throw err;
        }
    }
    async findByUserId(userId) {
        return this.vetProfileRepo.createQueryBuilder('profile')
            .leftJoinAndSelect('profile.user', 'user')
            .where('user.id = :userId', { userId })
            .getOne();
    }
    async findAllPendingApproval() {
        return this.vetProfileRepo.find({ where: { approved: false } });
    }
    async approveProfile(id) {
        const profile = await this.vetProfileRepo.findOneBy({ id });
        if (!profile)
            throw new Error('Profile not found');
        profile.approved = true;
        return this.vetProfileRepo.save(profile);
    }
    async getAnalytics() {
        const total = await this.vetProfileRepo.count();
        const pending = await this.vetProfileRepo.count({ where: { approved: false } });
        const approved = await this.vetProfileRepo.count({ where: { approved: true } });
        const approvalRate = total > 0 ? Math.round((approved / total) * 100) : 0;
        const raw = await this.vetProfileRepo.query(`
      SELECT TO_CHAR("createdAt", 'YYYY-MM') as month, COUNT(*) as count
      FROM vet_profile
      GROUP BY month
      ORDER BY month DESC
      LIMIT 6
    `);
        const perMonth = raw.reverse();
        return { total, pending, approved, approvalRate, perMonth };
    }
};
exports.VetProfileService = VetProfileService;
exports.VetProfileService = VetProfileService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(vet_profile_entity_1.VetProfile)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], VetProfileService);
//# sourceMappingURL=vet-profile.service.js.map