import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from './role.entity';

@Entity('utilisateurs')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: true, name: 'employe_id' })
  employeId: string | null;

  @Column({ type: 'int', nullable: true, name: 'role_id' })
  roleId: number | null;

  @Column({ type: 'varchar', length: 50, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 150, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255, name: 'password_hash', select: false })
  passwordHash: string;

  @Column({ type: 'boolean', default: true, name: 'is_actif' })
  isActif: boolean;

  @Column({ type: 'smallint', default: 0, name: 'tentatives_connexion' })
  tentativesConnexion: number;

  @Column({ type: 'timestamp', nullable: true, name: 'verrouille_jusqu' })
  verrouilleJusqu: Date | null;

  @Column({ type: 'timestamp', nullable: true, name: 'derniere_connexion' })
  derniereConnexion: Date | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  /** Relation → Role */
  @ManyToOne(() => Role, { eager: true, nullable: true })
  @JoinColumn({ name: 'role_id' })
  role: Role | null;
}
