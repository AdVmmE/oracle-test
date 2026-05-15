import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { Employee } from './employee.entity';
import type { JwtPayload } from '../auth/interfaces/jwt-payload.interface';
export declare class EmployeesController {
    private readonly employeesService;
    constructor(employeesService: EmployeesService);
    findAll(user: JwtPayload): Promise<Employee[]>;
    findOne(id: string): Promise<Employee>;
    create(dto: CreateEmployeeDto): Promise<Employee>;
    deactivate(id: string): Promise<void>;
}
