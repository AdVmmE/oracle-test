import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  /** Email or username */
  @IsNotEmpty()
  @IsString()
  login: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
