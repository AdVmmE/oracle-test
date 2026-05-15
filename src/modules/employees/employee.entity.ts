import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Department } from '../departments/department.entity';
import { Contract } from '../contracts/contract.entity';

export enum SexeEnum {
  M = 'M',
  F = 'F',
}

export enum SituationFamilialeEnum {
  CELIBATAIRE = 'celibataire',
  MARIE       = 'marie',
  DIVORCE     = 'divorce',
  VEUF        = 'veuf',
}

export enum CategorieEmployeEnum {
  CADRE          = 'cadre',
  AGENT_MAITRISE = 'agent_maitrise',
  EMPLOYE        = 'employe',
  OUVRIER        = 'ouvrier',
}

@Entity('employes')
export class Employee {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 20, unique: true })
  matricule: string;

  @Column({ type: 'varchar', length: 100 })
  nom: string;

  @Column({ type: 'varchar', length: 100 })
  prenom: string;

  @Column({ type: 'date', name: 'date_naissance' })
  date_naissance: string;

  @Column({ type: 'varchar', length: 100, nullable: true, name: 'lieu_naissance' })
  lieuNaissance: string | null;

  @Column({ type: 'varchar', length: 20, nullable: true, unique: true })
  cin: string | null;

  @Column({ type: 'varchar', length: 20, nullable: true, name: 'cnss_numero' })
  cnssNumero: string | null;

  @Column({ type: 'enum', enum: SexeEnum, enumName: 'sexe_enum' })
  sexe: SexeEnum;

  @Column({
    type: 'enum',
    enum: SituationFamilialeEnum,
    enumName: 'situation_familiale_enum',
    default: SituationFamilialeEnum.CELIBATAIRE,
    name: 'situation_familiale',
  })
  situationFamiliale: SituationFamilialeEnum;

  @Column({ type: 'smallint', default: 0, name: 'nb_enfants' })
  nbEnfants: number;

  @Column({ type: 'varchar', length: 20, nullable: true })
  telephone: string | null;

  @Column({ type: 'varchar', length: 150, nullable: true, unique: true, name: 'email_pro' })
  emailPro: string | null;

  @Column({ type: 'varchar', length: 150, nullable: true, name: 'email_perso' })
  emailPerso: string | null;

  @Column({ type: 'text', nullable: true })
  adresse: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  ville: string | null;

  @Column({ type: 'date', name: 'date_embauche' })
  dateEmbauche: string;

  @Column({ type: 'date', nullable: true, name: 'date_sortie' })
  dateSortie: string | null;

  @Column({
    type: 'enum',
    enum: CategorieEmployeEnum,
    enumName: 'categorie_employe_enum',
    default: CategorieEmployeEnum.EMPLOYE,
  })
  categorie: CategorieEmployeEnum;

  @Column({ type: 'integer', nullable: true, name: 'departement_id' })
  departementId: number | null;

  @Column({ type: 'integer', nullable: true, name: 'poste_id' })
  posteId: number | null;

  @Column({ type: 'boolean', default: true, name: 'is_actif' })
  isActif: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  /** Relation N→1 */
  @ManyToOne(() => Department, (dept) => dept.employes, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'departement_id' })
  departement: Department | null;

  /** Relation 1→N */
  @OneToMany(() => Contract, (contract) => contract.employe)
  contrats: Contract[];
}
