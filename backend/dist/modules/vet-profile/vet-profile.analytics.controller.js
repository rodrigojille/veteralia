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
Object.defineProperty(exports, "__esModule", { value: true });
exports.VetProfileAnalyticsController = void 0;
const common_1 = require("@nestjs/common");
const vet_profile_service_1 = require("./vet-profile.service");
const passport_1 = require("@nestjs/passport");
let VetProfileAnalyticsController = class VetProfileAnalyticsController {
    constructor(vetProfileService) {
        this.vetProfileService = vetProfileService;
    }
    async getAnalytics() {
        return this.vetProfileService.getAnalytics();
    }
};
exports.VetProfileAnalyticsController = VetProfileAnalyticsController;
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Get)('analytics'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], VetProfileAnalyticsController.prototype, "getAnalytics", null);
exports.VetProfileAnalyticsController = VetProfileAnalyticsController = __decorate([
    (0, common_1.Controller)('vet-profile'),
    __metadata("design:paramtypes", [vet_profile_service_1.VetProfileService])
], VetProfileAnalyticsController);
//# sourceMappingURL=vet-profile.analytics.controller.js.map