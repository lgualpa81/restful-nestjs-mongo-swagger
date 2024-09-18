import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsMongoId, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";

export class CreateCustomerDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name:string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber()
  phone:string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email:string;

  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  entityId:string
}

