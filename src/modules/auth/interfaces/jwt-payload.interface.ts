export interface JwtPayload {
  sub: string;          // user.id
  username: string;
  email: string;
  role: string;         // 'admin' | 'rh' | 'chef_equipe'
  roleId: number | null;
  employeId: string | null;
  departementId: number | null;  // dept of the linked employee (for chef_equipe filtering)
}
