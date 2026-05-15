import { Employee } from '../employees/employee.entity';
export declare class Department {
    id: string;
    nom: string;
    code: string;
    responsableId: string | null;
    responsable: Employee | null;
    employes: Employee[];
}
