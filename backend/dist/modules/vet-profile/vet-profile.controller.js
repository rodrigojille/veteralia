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
exports.VetProfileController = void 0;
const common_1 = require("@nestjs/common");
const vet_profile_service_1 = require("./vet-profile.service");
const passport_1 = require("@nestjs/passport");
let VetProfileController = class VetProfileController {
    constructor(vetProfileService) {
        this.vetProfileService = vetProfileService;
    }
    async createOrUpdate(req, data) {
        const user = req.user;
        if (!['veterinarian', 'secretary'].includes(user.role)) {
            return { error: 'Unauthorized' };
        }
        return this.vetProfileService.createOrUpdate(user, data);
    }
    async getMyProfile(req) {
        const user = req.user;
        return this.vetProfileService.findByUserId(user.id);
    }
    async getPending(req) {
        const user = req.user;
        if (user.role !== 'admin')
            return { error: 'Unauthorized' };
        return this.vetProfileService.findAllPendingApproval();
    }
    async approve(req, id) {
        const user = req.user;
        if (user.role !== 'admin')
            return { error: 'Unauthorized' };
        return this.vetProfileService.approveProfile(id);
    }
};
exports.VetProfileController = VetProfileController;
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Post)('me'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], VetProfileController.prototype, "createOrUpdate", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Get)('me'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], VetProfileController.prototype, "getMyProfile", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Get)('pending'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], VetProfileController.prototype, "getPending", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Patch)('approve/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], VetProfileController.prototype, "approve", null);
exports.VetProfileController = VetProfileController = __decorate([
    (0, common_1.Controller)('vet-profile'),
    __metadata("design:paramtypes", [vet_profile_service_1.VetProfileService])
], VetProfileController);
//# sourceMappingURL=vet-profile.controller.js.map