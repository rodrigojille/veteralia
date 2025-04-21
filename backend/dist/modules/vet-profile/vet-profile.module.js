"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VetProfileModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const vet_profile_entity_1 = require("./vet-profile.entity");
const vet_profile_service_1 = require("./vet-profile.service");
const vet_profile_controller_1 = require("./vet-profile.controller");
const vet_profile_analytics_controller_1 = require("./vet-profile.analytics.controller");
let VetProfileModule = class VetProfileModule {
};
exports.VetProfileModule = VetProfileModule;
exports.VetProfileModule = VetProfileModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([vet_profile_entity_1.VetProfile])],
        providers: [vet_profile_service_1.VetProfileService],
        controllers: [vet_profile_controller_1.VetProfileController, vet_profile_analytics_controller_1.VetProfileAnalyticsController],
        exports: [vet_profile_service_1.VetProfileService],
    })
], VetProfileModule);
//# sourceMappingURL=vet-profile.module.js.map