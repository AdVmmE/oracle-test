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
exports.Employee = exports.CategorieEmployeEnum = exports.SituationFamilialeEnum = exports.SexeEnum = void 0;
const typeorm_1 = require("typeorm");
const department_entity_1 = require("../departments/department.entity");
const contract_entity_1 = require("../contracts/contract.entity");
var SexeEnum;
(function (SexeEnum) {
    SexeEnum["M"] = "M";
    SexeEnum["F"] = "F";
})(SexeEnum || (exports.SexeEnum = SexeEnum = {}));
var SituationFamilialeEnum;
(function (SituationFamilialeEnum) {
    SituationFamilialeEnum["CELIBATAIRE"] = "celibataire";
    SituationFamilialeEnum["MARIE"] = "marie";
    SituationFamilialeEnum["DIVORCE"] = "divorce";
    SituationFamilialeEnum["VEUF"] = "veuf";
})(SituationFamilialeEnum || (exports.SituationFamilialeEnum = SituationFamilialeEnum = {}));
var CategorieEmployeEnum;
(function (CategorieEmployeEnum) {
    CategorieEmployeEnum["CADRE"] = "cadre";
    CategorieEmployeEnum["AGENT_MAITRISE"] = "agent_maitrise";
    CategorieEmployeEnum["EMPLOYE"] = "employe";
    CategorieEmployeEnum["OUVRIER"] = "ouvrier";
})(CategorieEmployeEnum || (exports.CategorieEmployeEnum = CategorieEmployeEnum = {}));
let Employee = class Employee {
    id;
    matricule;
    nom;
    prenom;
    date_naissance;
    lieuNaissance;
    cin;
    cnssNumero;
    sexe;
    situationFamiliale;
    nbEnfants;
    telephone;
    emailPro;
    emailPerso;
    adresse;
    ville;
    dateEmbauche;
    dateSortie;
    categorie;
    departementId;
    posteId;
    isActif;
    createdAt;
    updatedAt;
    departement;
    contrats;
};
exports.Employee = Employee;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Employee.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, unique: true }),
    __metadata("design:type", String)
], Employee.prototype, "matricule", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], Employee.prototype, "nom", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], Employee.prototype, "prenom", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', name: 'date_naissance' }),
    __metadata("design:type", String)
], Employee.prototype, "date_naissance", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: true, name: 'lieu_naissance' }),
    __metadata("design:type", Object)
], Employee.prototype, "lieuNaissance", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, nullable: true, unique: true }),
    __metadata("design:type", Object)
], Employee.prototype, "cin", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, nullable: true, name: 'cnss_numero' }),
    __metadata("design:type", Object)
], Employee.prototype, "cnssNumero", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: SexeEnum, enumName: 'sexe_enum' }),
    __metadata("design:type", String)
], Employee.prototype, "sexe", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: SituationFamilialeEnum,
        enumName: 'situation_familiale_enum',
        default: SituationFamilialeEnum.CELIBATAIRE,
        name: 'situation_familiale',
    }),
    __metadata("design:type", String)
], Employee.prototype, "situationFamiliale", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'smallint', default: 0, name: 'nb_enfants' }),
    __metadata("design:type", Number)
], Employee.prototype, "nbEnfants", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, nullable: true }),
    __metadata("design:type", Object)
], Employee.prototype, "telephone", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 150, nullable: true, unique: true, name: 'email_pro' }),
    __metadata("design:type", Object)
], Employee.prototype, "emailPro", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 150, nullable: true, name: 'email_perso' }),
    __metadata("design:type", Object)
], Employee.prototype, "emailPerso", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], Employee.prototype, "adresse", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", Object)
], Employee.prototype, "ville", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', name: 'date_embauche' }),
    __metadata("design:type", String)
], Employee.prototype, "dateEmbauche", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true, name: 'date_sortie' }),
    __metadata("design:type", Object)
], Employee.prototype, "dateSortie", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: CategorieEmployeEnum,
        enumName: 'categorie_employe_enum',
        default: CategorieEmployeEnum.EMPLOYE,
    }),
    __metadata("design:type", String)
], Employee.prototype, "categorie", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', nullable: true, name: 'departement_id' }),
    __metadata("design:type", Object)
], Employee.prototype, "departementId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', nullable: true, name: 'poste_id' }),
    __metadata("design:type", Object)
], Employee.prototype, "posteId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: true, name: 'is_actif' }),
    __metadata("design:type", Boolean)
], Employee.prototype, "isActif", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Employee.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Employee.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => department_entity_1.Department, (dept) => dept.employes, {
        nullable: true,
        onDelete: 'SET NULL',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'departement_id' }),
    __metadata("design:type", Object)
], Employee.prototype, "departement", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => contract_entity_1.Contract, (contract) => contract.employe),
    __metadata("design:type", Array)
], Employee.prototype, "contrats", void 0);
exports.Employee = Employee = __decorate([
    (0, typeorm_1.Entity)('employes')
], Employee);
//# sourceMappingURL=employee.entity.js.map