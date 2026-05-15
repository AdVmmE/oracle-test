import { CategorieEmployeEnum, SexeEnum, SituationFamilialeEnum } from '../employee.entity';
export declare class CreateEmployeeDto {
    matricule: string;
    nom: string;
    prenom: string;
    date_naissance: string;
    sexe: SexeEnum;
    lieuNaissance?: string;
    cin?: string;
    cnssNumero?: string;
    situationFamiliale?: SituationFamilialeEnum;
    nbEnfants?: number;
    telephone?: string;
    emailPro?: string;
    emailPerso?: string;
    adresse?: string;
    ville?: string;
    dateEmbauche: string;
    dateSortie?: string;
    categorie?: CategorieEmployeEnum;
    departementId?: number;
    posteId?: number;
}
