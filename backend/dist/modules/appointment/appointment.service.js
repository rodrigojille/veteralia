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
exports.AppointmentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const appointment_entity_1 = require("./appointment.entity");
const pet_entity_1 = require("../pet/pet.entity");
const user_entity_1 = require("../users/user.entity");
let AppointmentService = class AppointmentService {
    constructor(appointmentRepo, petRepo, userRepo) {
        this.appointmentRepo = appointmentRepo;
        this.petRepo = petRepo;
        this.userRepo = userRepo;
    }
    async findAllForOwner(ownerId) {
        return this.appointmentRepo.find({
            where: { petOwner: { id: ownerId } },
            relations: ['pet', 'veterinarian'],
            order: { datetime: 'DESC' },
        });
    }
    async findAllForVet(vetId) {
        return this.appointmentRepo.find({
            where: { veterinarian: { id: vetId } },
            relations: ['pet', 'petOwner'],
            order: { datetime: 'DESC' },
        });
    }
    async create(owner, petId, vetId, data) {
        const pet = await this.petRepo.findOne({ where: { id: petId, owner: { id: owner.id } } });
        const vet = await this.userRepo.findOne({ where: { id: vetId, role: 'veterinarian' } });
        if (!pet || !vet)
            throw new Error('Invalid pet or vet');
        const appt = this.appointmentRepo.create(Object.assign(Object.assign({}, data), { petOwner: owner, pet, veterinarian: vet }));
        return this.appointmentRepo.save(appt);
    }
    async update(id, ownerId, data) {
        const appt = await this.appointmentRepo.findOne({ where: { id, petOwner: { id: ownerId } } });
        if (!appt)
            return null;
        Object.assign(appt, data);
        return this.appointmentRepo.save(appt);
    }
    async remove(id, ownerId) {
        const appt = await this.appointmentRepo.findOne({ where: { id, petOwner: { id: ownerId } } });
        if (!appt)
            return null;
        await this.appointmentRepo.remove(appt);
        return true;
    }
};
exports.AppointmentService = AppointmentService;
exports.AppointmentService = AppointmentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(appointment_entity_1.Appointment)),
    __param(1, (0, typeorm_1.InjectRepository)(pet_entity_1.Pet)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], AppointmentService);
//# sourceMappingURL=appointment.service.js.map