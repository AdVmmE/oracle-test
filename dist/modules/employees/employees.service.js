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
exports.EmployeesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const employee_entity_1 = require("./employee.entity");
let EmployeesService = class EmployeesService {
    employeeRepo;
    constructor(employeeRepo) {
        this.employeeRepo = employeeRepo;
    }
    async findAll(departementId) {
        const where = { isActif: true };
        if (departementId != null)
            where.departementId = departementId;
        return this.employeeRepo.find({
            where,
            relations: { departement: true },
            order: { nom: 'ASC', prenom: 'ASC' },
            select: {
                id: true,
                matricule: true,
                nom: true,
                prenom: true,
                emailPro: true,
                dateEmbauche: true,
                isActif: true,
                departement: {
                    id: true,
                    nom: true,
                    code: true,
                },
            },
        });
    }
    async findOne(id) {
        const employee = await this.employeeRepo.findOne({
            where: { id },
            relations: { departement: true, contrats: true },
        });
        if (!employee) {
            throw new common_1.NotFoundException(`Employé avec l'id "${id}" introuvable.`);
        }
        return employee;
    }
    async create(dto) {
        const existingMatricule = await this.employeeRepo.findOne({
            where: { matricule: dto.matricule },
        });
        if (existingMatricule) {
            throw new common_1.ConflictException(`Le matricule "${dto.matricule}" est déjà utilisé.`);
        }
        const existingEmail = await this.employeeRepo.findOne({
            where: { emailPro: dto.emailPro },
        });
        if (existingEmail) {
            throw new common_1.ConflictException(`L'email "${dto.emailPro}" est déjà utilisé.`);
        }
        const employee = this.employeeRepo.create({
            matricule: dto.matricule,
            nom: dto.nom,
            prenom: dto.prenom,
            date_naissance: dto.date_naissance,
            sexe: dto.sexe,
            lieuNaissance: dto.lieuNaissance ?? null,
            cin: dto.cin ?? null,
            cnssNumero: dto.cnssNumero ?? null,
            situationFamiliale: dto.situationFamiliale ?? 'celibataire',
            nbEnfants: dto.nbEnfants ?? 0,
            telephone: dto.telephone ?? null,
            emailPro: dto.emailPro ?? null,
            emailPerso: dto.emailPerso ?? null,
            adresse: dto.adresse ?? null,
            ville: dto.ville ?? null,
            dateEmbauche: dto.dateEmbauche,
            dateSortie: dto.dateSortie ?? null,
            categorie: dto.categorie ?? 'employe',
            departementId: dto.departementId ?? null,
            posteId: dto.posteId ?? null,
        });
        return this.employeeRepo.save(employee);
    }
    async deactivate(id) {
        const employee = await this.findOne(id);
        employee.isActif = false;
        return this.employeeRepo.save(employee);
    }
};
exports.EmployeesService = EmployeesService;
exports.EmployeesService = EmployeesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(employee_entity_1.Employee)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], EmployeesService);
//# sourceMappingURL=employees.service.js.map