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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../users/user.entity");
const vet_profile_entity_1 = require("../vet-profile/vet-profile.entity");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
let AuthService = class AuthService {
    constructor(userRepository, vetProfileRepository) {
        this.userRepository = userRepository;
        this.vetProfileRepository = vetProfileRepository;
    }
    async signup(signupDto) {
        const { email, password, name, role, language } = signupDto;
        const existing = await this.userRepository.findOne({ where: { email } });
        if (existing)
            throw new common_1.ConflictException('Email already registered');
        const hash = await bcrypt.hash(password, 10);
        const user = this.userRepository.create({ email, password: hash, name, role, language });
        await this.userRepository.save(user);
        if (role === 'veterinarian') {
            const vetProfile = this.vetProfileRepository.create({
                user,
                specialty: signupDto.specialty || '',
                location: signupDto.location || '',
                pricingTier: signupDto.pricingTier || 'basic',
                approved: false,
                schedule: null,
            });
            await this.vetProfileRepository.save(vetProfile);
        }
        return { message: 'Signup successful' };
    }
    async login(loginDto) {
        const { email, password } = loginDto;
        console.log('[AUTH] Login attempt:', email);
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            console.log('[AUTH] User not found for email:', email);
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        console.log('[AUTH] User found:', user.email, 'Role:', user.role);
        const valid = await bcrypt.compare(password, user.password);
        console.log('[AUTH] Password valid?', valid);
        if (!valid) {
            console.log('[AUTH] Invalid password for:', email);
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const token = jwt.sign({ sub: user.id, role: user.role }, process.env.JWT_SECRET || 'secret', {
            expiresIn: '7d',
        });
        console.log('[AUTH] Login success, token issued for:', email);
        return { access_token: token, user: { id: user.id, email: user.email, name: user.name, role: user.role, language: user.language } };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(vet_profile_entity_1.VetProfile)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], AuthService);
//# sourceMappingURL=auth.service.js.map