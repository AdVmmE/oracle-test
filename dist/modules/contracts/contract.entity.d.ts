import { Employee } from '../employees/employee.entity';
export declare enum TypeContrat {
    CDI = "CDI",
    CDD = "CDD",
    ANAPEC = "ANAPEC",
    INTERIM = "interim",
    STAGE = "stage"
}
export declare class Contract {
    id: string;
    employeId: string;
    employe: Employee;
    typeContrat: TypeContrat;
    dateDebut: string;
    salaireBase: string;
    isActif: boolean;
    createdAt: Date;
}
