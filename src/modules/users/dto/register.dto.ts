import { IsMongoId, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { UserRoleEnum } from "src/modules/auth/enums";

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsString()  
  @IsNotEmpty()
  role: UserRoleEnum;

  @IsMongoId()
  @IsOptional()
  entityId?: string;
}