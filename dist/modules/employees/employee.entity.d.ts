import { Department } from '../departments/department.entity';
import { Contract } from '../contracts/contract.entity';
export declare enum SexeEnum {
    M = "M",
    F = "F"
}
export declare enum SituationFamilialeEnum {
    CELIBATAIRE = "celibataire",
    MARIE = "marie",
    DIVORCE = "divorce",
    VEUF = "veuf"
}
export declare enum CategorieEmployeEnum {
    CADRE = "cadre",
    AGENT_MAITRISE = "agent_maitrise",
    EMPLOYE = "employe",
    OUVRIER = "ouvrier"
}
export declare class Employee {
    id: string;
    matricule: string;
    nom: string;
    prenom: string;
    date_naissance: string;
    lieuNaissance: string | null;
    cin: string | null;
    cnssNumero: string | null;
    sexe: SexeEnum;
    situationFamiliale: SituationFamilialeEnum;
    nbEnfants: number;
    telephone: string | null;
    emailPro: string | null;
    emailPerso: string | null;
    adresse: string | null;
    ville: string | null;
    dateEmbauche: string;
    dateSortie: string | null;
    categorie: CategorieEmployeEnum;
    departementId: number | null;
    posteId: number | null;
    isActif: boolean;
    createdAt: Date;
    updatedAt: Date;
    departement: Department | null;
    contrats: Contract[];
}
