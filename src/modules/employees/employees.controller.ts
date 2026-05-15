import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { Employee } from './employee.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { JwtPayload } from '../auth/interfaces/jwt-payload.interface';

@Controller('employees')
@UseGuards(JwtAuthGuard, RolesGuard)
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  /**
   * GET /employees
   * admin / rh  → all active employees
   * chef_equipe → only employees in their own department
   */
  @Get()
  @Roles('admin', 'rh', 'chef_equipe')
  findAll(@CurrentUser() user: JwtPayload): Promise<Employee[]> {
    const deptFilter = user.role === 'chef_equipe' ? user.departementId : null;
    return this.employeesService.findAll(deptFilter);
  }

  /**
   * GET /employees/:id
   * admin, rh, manager can view any employee
   */
  @Get(':id')
  @Roles('admin', 'rh', 'chef_equipe')
  findOne(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<Employee> {
    return this.employeesService.findOne(id);
  }

  /**
   * POST /employees
   * admin and rh only
   */
  @Post()
  @Roles('admin', 'rh')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateEmployeeDto): Promise<Employee> {
    return this.employeesService.create(dto);
  }

  /**
   * DELETE /employees/:id
   * admin only
   */
  @Delete(':id')
  @Roles('admin')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deactivate(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<void> {
    await this.employeesService.deactivate(id);
  }
}
