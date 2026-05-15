import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { Employee } from '../employees/employee.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)     private readonly userRepo: Repository<User>,
    @InjectRepository(Employee) private readonly employeeRepo: Repository<Employee>,
    private readonly jwtService: JwtService,
  ) {}

  /** POST /auth/login */
  async login(dto: LoginDto): Promise<{ access_token: string; user: Partial<User> }> {
    // Find by email or username
    const user = await this.userRepo
      .createQueryBuilder('u')
      .addSelect('u.passwordHash')
      .leftJoinAndSelect('u.role', 'role')
      .where('u.email = :login OR u.username = :login', { login: dto.login })
      .getOne();

    if (!user) throw new UnauthorizedException('Identifiants incorrects.');
    if (!user.isActif) throw new UnauthorizedException('Compte désactivé.');

    // hadi tatblokci ddoc w dak lqlawi d chihab ankhdmoha taaal mn b3d daba gha khli 3do rbha hna
    // // Check lockout
    // if (user.verrouilleJusqu && user.verrouilleJusqu > new Date()) {
    //   throw new UnauthorizedException(
    //     `Compte verrouillé jusqu'à ${user.verrouilleJusqu.toISOString()}.`,
    //   );
    // }

    const passwordOk = await bcrypt.compare(dto.password, user.passwordHash);

    if (!passwordOk) {
      // TODO: uncomment lockout logic before production
      // // Increment failed attempts, lock after 5
      // user.tentativesConnexion += 1;
      // if (user.tentativesConnexion >= 5) {
      //   const lockUntil = new Date();
      //   lockUntil.setMinutes(lockUntil.getMinutes() + 30);
      //   user.verrouilleJusqu = lockUntil;
      // }
      // await this.userRepo.save(user);
      throw new UnauthorizedException('Identifiants incorrects.');
    }

    // Reset on success
    user.tentativesConnexion = 0;
    user.verrouilleJusqu = null;
    user.derniereConnexion = new Date();
    await this.userRepo.save(user);

    // Map DB role names → app role names (manager → chef_equipe)
    const roleMap: Record<string, string> = {
      admin:   'admin',
      rh:      'rh',
      manager: 'chef_equipe',
    };
    const roleName = user.role?.nom ?? 'rh';
    const appRole  = roleMap[roleName] ?? roleName;

    // Fetch departement_id from the linked employee record (needed for chef_equipe filtering)
    let departementId: number | null = null;
    if (user.employeId) {
      const employe = await this.employeeRepo.findOne({
        where: { id: user.employeId },
        select: ['id', 'departementId'],
      });
      departementId = employe?.departementId ?? null;
    }

    const payload: JwtPayload = {
      sub:           user.id,
      username:      user.username,
      email:         user.email,
      role:          appRole,
      roleId:        user.roleId,
      employeId:     user.employeId,
      departementId,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        roleId: user.roleId,
        employeId: user.employeId,
        isActif: user.isActif,
      },
    };
  }

  /** POST /auth/logout */
  async logout(userId: string): Promise<{ message: string }> {
    // Record last activity (JWT is stateless; client must discard the token)
    await this.userRepo.update({ id: userId }, { derniereConnexion: new Date() });
    return { message: 'Déconnexion réussie.' };
  }

  /** POST /auth/register  (admin only in production) */
  async register(dto: RegisterDto): Promise<Omit<User, 'passwordHash'>> {
    const existing = await this.userRepo.findOne({
      where: [{ email: dto.email }, { username: dto.username }],
    });
    if (existing) {
      throw new ConflictException('Email ou nom d\'utilisateur déjà utilisé.');
    }

    const passwordHash = await bcrypt.hash(dto.password, 12);

    const user = this.userRepo.create({
      username: dto.username,
      email: dto.email,
      passwordHash,
      employeId: dto.employeId ?? null,
      roleId: dto.roleId ?? 5, // default: employe
    });

    const saved = await this.userRepo.save(user);
    const { passwordHash: _ph, ...result } = saved as any;
    return result;
  }

  /** GET /auth/me */
  async me(userId: string): Promise<User> {
    const user = await this.userRepo.findOne({
      where: { id: userId },
      relations: { role: true },
    });
    if (!user) throw new NotFoundException('Utilisateur introuvable.');
    return user;
  }
}
