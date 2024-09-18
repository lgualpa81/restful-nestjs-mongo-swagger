import { ApiProperty } from "@nestjs/swagger";
import { IsAlphanumeric, IsArray, IsEmail, IsEnum, IsIn, IsMongoId, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { UserRoleEnum } from "../enums";

export class RegisterDto {
  @ApiProperty()
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @IsAlphanumeric()
  password: string;

  @ApiProperty()
  @IsEnum(UserRoleEnum, {
    message: `Role must be of the following values: ${Object.values(UserRoleEnum).join(', ')}`
  })
  @IsNotEmpty()
  role: UserRoleEnum;

  @ApiProperty({
    nullable: true,
    description: "Optional",
  })
  @IsMongoId()
  @IsOptional()
  entityId?: string;
}