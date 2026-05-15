import { Repository } from 'typeorm';
import { Employee } from './employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
export declare class EmployeesService {
    private readonly employeeRepo;
    constructor(employeeRepo: Repository<Employee>);
    findAll(departementId?: number | null): Promise<Employee[]>;
    findOne(id: string): Promise<Employee>;
    create(dto: CreateEmployeeDto): Promise<Employee>;
    deactivate(id: string): Promise<Employee>;
}
