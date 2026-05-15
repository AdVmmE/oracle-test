import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import type { JwtPayload } from './interfaces/jwt-payload.interface';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(dto: LoginDto): Promise<{
        access_token: string;
        user: Partial<import("./entities/user.entity").User>;
    }>;
    register(dto: RegisterDto): Promise<Omit<import("./entities/user.entity").User, "passwordHash">>;
    logout(user: JwtPayload): Promise<{
        message: string;
    }>;
    me(user: JwtPayload): Promise<import("./entities/user.entity").User>;
}
