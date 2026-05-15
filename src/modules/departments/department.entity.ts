import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Employee } from '../employees/employee.entity';

@Entity('departements')
export class Department {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  nom: string;

  @Column({ type: 'varchar', length: 20, unique: true })
  code: string;

  /**
   * FK auto-référentielle : le chef de département est un employé.
   * Nullable car le département peut exister avant d'avoir un responsable.
   */
  @Column({ type: 'uuid', nullable: true, name: 'responsable_id' })
  responsableId: string | null;

  @ManyToOne(() => Employee, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'responsable_id' })
  responsable: Employee | null;

  /** Un département contient plusieurs employés. */
  @OneToMany(() => Employee, (employee) => employee.departement)
  employes: Employee[];
}
