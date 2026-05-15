export interface JwtPayload {
    sub: string;
    username: string;
    email: string;
    role: string;
    roleId: number | null;
    employeId: string | null;
    departementId: number | null;
}
