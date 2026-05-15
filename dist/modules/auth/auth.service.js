"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const jwt_1 = require("@nestjs/jwt");
const bcrypt = __importStar(require("bcrypt"));
const user_entity_1 = require("./entities/user.entity");
const employee_entity_1 = require("../employees/employee.entity");
let AuthService = class AuthService {
    userRepo;
    employeeRepo;
    jwtService;
    constructor(userRepo, employeeRepo, jwtService) {
        this.userRepo = userRepo;
        this.employeeRepo = employeeRepo;
        this.jwtService = jwtService;
    }
    async login(dto) {
        const user = await this.userRepo
            .createQueryBuilder('u')
            .addSelect('u.passwordHash')
            .leftJoinAndSelect('u.role', 'role')
            .where('u.email = :login OR u.username = :login', { login: dto.login })
            .getOne();
        if (!user)
            throw new common_1.UnauthorizedException('Identifiants incorrects.');
        if (!user.isActif)
            throw new common_1.UnauthorizedException('Compte désactivé.');
        const passwordOk = await bcrypt.compare(dto.password, user.passwordHash);
        if (!passwordOk) {
            throw new common_1.UnauthorizedException('Identifiants incorrects.');
        }
        user.tentativesConnexion = 0;
        user.verrouilleJusqu = null;
        user.derniereConnexion = new Date();
        await this.userRepo.save(user);
        const roleMap = {
            admin: 'admin',
            rh: 'rh',
            manager: 'chef_equipe',
        };
        const roleName = user.role?.nom ?? 'rh';
        const appRole = roleMap[roleName] ?? roleName;
        let departementId = null;
        if (user.employeId) {
            const employe = await this.employeeRepo.findOne({
                where: { id: user.employeId },
                select: ['id', 'departementId'],
            });
            departementId = employe?.departementId ?? null;
        }
        const payload = {
            sub: user.id,
            username: user.username,
            email: user.email,
            role: appRole,
            roleId: user.roleId,
            employeId: user.employeId,
            departementId,
        };
        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                roleId: user.roleId,
                employeId: user.employeId,
                isActif: user.isActif,
            },
        };
    }
    async logout(userId) {
        await this.userRepo.update({ id: userId }, { derniereConnexion: new Date() });
        return { message: 'Déconnexion réussie.' };
    }
    async register(dto) {
        const existing = await this.userRepo.findOne({
            where: [{ email: dto.email }, { username: dto.username }],
        });
        if (existing) {
            throw new common_1.ConflictException('Email ou nom d\'utilisateur déjà utilisé.');
        }
        const passwordHash = await bcrypt.hash(dto.password, 12);
        const user = this.userRepo.create({
            username: dto.username,
            email: dto.email,
            passwordHash,
            employeId: dto.employeId ?? null,
            roleId: dto.roleId ?? 5,
        });
        const saved = await this.userRepo.save(user);
        const { passwordHash: _ph, ...result } = saved;
        return result;
    }
    async me(userId) {
        const user = await this.userRepo.findOne({
            where: { id: userId },
            relations: { role: true },
        });
        if (!user)
            throw new common_1.NotFoundException('Utilisateur introuvable.');
        return user;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(employee_entity_1.Employee)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map