import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Employee } from '../employees/employee.entity';

/** Types de contrat autorisés (conformes au droit du travail marocain). */
export enum TypeContrat {
  CDI      = 'CDI',
  CDD      = 'CDD',
  ANAPEC   = 'ANAPEC',
  INTERIM  = 'interim',
  STAGE    = 'stage',
}

@Entity('contrats')
export class Contract {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'employe_id' })
  employeId: string;

  /** Relation N→1 : le contrat appartient à un seul employé. */
  @ManyToOne(() => Employee, (emp) => emp.contrats, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'employe_id' })
  employe: Employee;

  @Column({
    type: 'enum',
    enum: TypeContrat,
    default: TypeContrat.CDI,
    name: 'type_contrat',
  })
  typeContrat: TypeContrat;

  @Column({ type: 'date', name: 'date_debut' })
  dateDebut: string;

  /**
   * NUMERIC côté PostgreSQL → stocké en string par TypeORM.
   * Utiliser parseFloat() lors des calculs.
   */
  @Column({
    type: 'numeric',
    precision: 12,
    scale: 2,
    name: 'salaire_base',
  })
  salaireBase: string;

  /** true = contrat actif, false = contrat historique. */
  @Column({ type: 'boolean', default: true, name: 'is_actif' })
  isActif: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
