import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsNotEmpty, IsString } from "class-validator";

export class CreatePolicyDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  details:string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  policyNumber:string;

  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  customerId:string

  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  entityId:string
}

