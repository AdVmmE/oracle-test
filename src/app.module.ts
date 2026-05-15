import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmployeesModule } from './modules/employees/employees.module';
import { AuthModule } from './modules/auth/auth.module';
import { Employee } from './modules/employees/employee.entity';
import { Department } from './modules/departments/department.entity';
import { Contract } from './modules/contracts/contract.entity';
import { User } from './modules/auth/entities/user.entity';
import { Role } from './modules/auth/entities/role.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST', 'localhost'),
        port: config.get<number>('DB_PORT', 5432),
        username: config.get<string>('DB_USERNAME', 'postgres'),
        password: config.get<string>('DB_PASSWORD', ''),
        database: config.get<string>('DB_NAME', 'sgrh'),
        entities: [Employee, Department, Contract, User, Role],
        synchronize: false,
        logging: config.get<string>('NODE_ENV') === 'development',
        ssl: { rejectUnauthorized: false },
      }),
    }),
    AuthModule,
    EmployeesModule,
  ],
})
export class AppModule {}
