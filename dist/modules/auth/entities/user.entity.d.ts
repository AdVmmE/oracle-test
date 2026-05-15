import { Role } from './role.entity';
export declare class User {
    id: string;
    employeId: string | null;
    roleId: number | null;
    username: string;
    email: string;
    passwordHash: string;
    isActif: boolean;
    tentativesConnexion: number;
    verrouilleJusqu: Date | null;
    derniereConnexion: Date | null;
    createdAt: Date;
    updatedAt: Date;
    role: Role | null;
}
