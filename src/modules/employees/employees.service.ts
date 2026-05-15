import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepo: Repository<Employee>,
  ) {}

  /**
   * Récupère les employés actifs.
   * - admin / rh → tous les employés
   * - chef_equipe → seulement les employés de son département
   */
  async findAll(departementId?: number | null): Promise<Employee[]> {
    const where: any = { isActif: true };
    if (departementId != null) where.departementId = departementId;

    return this.employeeRepo.find({
      where,
      relations: { departement: true },
      order: { nom: 'ASC', prenom: 'ASC' },
      select: {
        id: true,
        matricule: true,
        nom: true,
        prenom: true,
        emailPro: true,
        dateEmbauche: true,
        isActif: true,
        departement: {
          id: true,
          nom: true,
          code: true,
        },
      },
    });
  }

  /**
   * Récupère un employé par son ID (avec contrats et département).
   * Lève une NotFoundException si introuvable.
   */
  async findOne(id: string): Promise<Employee> {
    const employee = await this.employeeRepo.findOne({
      where: { id },
      relations: { departement: true, contrats: true },
    });

    if (!employee) {
      throw new NotFoundException(`Employé avec l'id "${id}" introuvable.`);
    }
    return employee;
  }

  /**
   * Crée un nouvel employé.
   * Vérifie l'unicité du matricule et de l'email avant insertion.
   */
  async create(dto: CreateEmployeeDto): Promise<Employee> {
    // Vérification unicité matricule
    const existingMatricule = await this.employeeRepo.findOne({
      where: { matricule: dto.matricule },
    });
    if (existingMatricule) {
      throw new ConflictException(
        `Le matricule "${dto.matricule}" est déjà utilisé.`,
      );
    }

    // Vérification unicité email
    const existingEmail = await this.employeeRepo.findOne({
      where: { emailPro: dto.emailPro },
    });
    if (existingEmail) {
      throw new ConflictException(
        `L'email "${dto.emailPro}" est déjà utilisé.`,
      );
    }

    const employee = this.employeeRepo.create({
      matricule:         dto.matricule,
      nom:               dto.nom,
      prenom:            dto.prenom,
      date_naissance:    dto.date_naissance,
      sexe:              dto.sexe,
      lieuNaissance:     dto.lieuNaissance    ?? null,
      cin:               dto.cin              ?? null,
      cnssNumero:        dto.cnssNumero       ?? null,
      situationFamiliale: dto.situationFamiliale ?? 'celibataire' as any,
      nbEnfants:         dto.nbEnfants        ?? 0,
      telephone:         dto.telephone        ?? null,
      emailPro:          dto.emailPro         ?? null,
      emailPerso:        dto.emailPerso       ?? null,
      adresse:           dto.adresse          ?? null,
      ville:             dto.ville            ?? null,
      dateEmbauche:      dto.dateEmbauche,
      dateSortie:        dto.dateSortie       ?? null,
      categorie:         dto.categorie        ?? 'employe' as any,
      departementId:     dto.departementId    ?? null,
      posteId:           dto.posteId          ?? null,
    });

    return this.employeeRepo.save(employee);
  }

  /**
   * Désactive un employé (soft delete).
   * Ne supprime jamais l'enregistrement pour préserver l'historique.
   */
  async deactivate(id: string): Promise<Employee> {
    const employee = await this.findOne(id);
    employee.isActif = false;
    return this.employeeRepo.save(employee);
  }
}
