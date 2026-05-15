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
exports.Contract = exports.TypeContrat = void 0;
const typeorm_1 = require("typeorm");
const employee_entity_1 = require("../employees/employee.entity");
var TypeContrat;
(function (TypeContrat) {
    TypeContrat["CDI"] = "CDI";
    TypeContrat["CDD"] = "CDD";
    TypeContrat["ANAPEC"] = "ANAPEC";
    TypeContrat["INTERIM"] = "interim";
    TypeContrat["STAGE"] = "stage";
})(TypeContrat || (exports.TypeContrat = TypeContrat = {}));
let Contract = class Contract {
    id;
    employeId;
    employe;
    typeContrat;
    dateDebut;
    salaireBase;
    isActif;
    createdAt;
};
exports.Contract = Contract;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Contract.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', name: 'employe_id' }),
    __metadata("design:type", String)
], Contract.prototype, "employeId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => employee_entity_1.Employee, (emp) => emp.contrats, {
        onDelete: 'RESTRICT',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'employe_id' }),
    __metadata("design:type", employee_entity_1.Employee)
], Contract.prototype, "employe", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: TypeContrat,
        default: TypeContrat.CDI,
        name: 'type_contrat',
    }),
    __metadata("design:type", String)
], Contract.prototype, "typeContrat", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', name: 'date_debut' }),
    __metadata("design:type", String)
], Contract.prototype, "dateDebut", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'numeric',
        precision: 12,
        scale: 2,
        name: 'salaire_base',
    }),
    __metadata("design:type", String)
], Contract.prototype, "salaireBase", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: true, name: 'is_actif' }),
    __metadata("design:type", Boolean)
], Contract.prototype, "isActif", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Contract.prototype, "createdAt", void 0);
exports.Contract = Contract = __decorate([
    (0, typeorm_1.Entity)('contrats')
], Contract);
//# sourceMappingURL=contract.entity.js.map