import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  Min,
} from 'class-validator';
import {
  CategorieEmployeEnum,
  SexeEnum,
  SituationFamilialeEnum,
} from '../employee.entity';

export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  @Matches(/^[A-Za-z0-9\-]+$/, {
    message: 'Matricule: lettres, chiffres et tirets uniquement.',
  })
  matricule: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nom: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  prenom: string;

  /** YYYY-MM-DD */
  @IsDateString()
  date_naissance: string;

  @IsEnum(SexeEnum, { message: 'sexe doit être M ou F.' })
  sexe: SexeEnum;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  lieuNaissance?: string;

  @IsString()
  @IsOptional()
  @MaxLength(20)
  cin?: string;

  @IsString()
  @IsOptional()
  @MaxLength(20)
  cnssNumero?: string;

  @IsEnum(SituationFamilialeEnum)
  @IsOptional()
  situationFamiliale?: SituationFamilialeEnum;

  @IsInt()
  @Min(0)
  @IsOptional()
  nbEnfants?: number;

  @IsString()
  @IsOptional()
  @MaxLength(20)
  telephone?: string;

  @IsEmail()
  @IsOptional()
  @MaxLength(150)
  emailPro?: string;

  @IsEmail()
  @IsOptional()
  @MaxLength(150)
  emailPerso?: string;

  @IsString()
  @IsOptional()
  adresse?: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  ville?: string;

  /** YYYY-MM-DD */
  @IsDateString()
  dateEmbauche: string;

  /** YYYY-MM-DD */
  @IsDateString()
  @IsOptional()
  dateSortie?: string;

  @IsEnum(CategorieEmployeEnum)
  @IsOptional()
  categorie?: CategorieEmployeEnum;

  @IsInt()
  @IsOptional()
  departementId?: number;

  @IsInt()
  @IsOptional()
  posteId?: number;
}
