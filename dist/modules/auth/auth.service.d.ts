import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from './entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Employee } from '../employees/employee.entity';
export declare class AuthService {
    private readonly userRepo;
    private readonly employeeRepo;
    private readonly jwtService;
    constructor(userRepo: Repository<User>, employeeRepo: Repository<Employee>, jwtService: JwtService);
    login(dto: LoginDto): Promise<{
        access_token: string;
        user: Partial<User>;
    }>;
    logout(userId: string): Promise<{
        message: string;
    }>;
    register(dto: RegisterDto): Promise<Omit<User, 'passwordHash'>>;
    me(userId: string): Promise<User>;
}
