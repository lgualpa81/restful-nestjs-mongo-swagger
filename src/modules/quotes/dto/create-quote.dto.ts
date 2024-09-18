import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsNotEmpty, IsString } from "class-validator";

export class CreateQuoteDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  policyDetails:string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  quoteNumber:string;

  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  customerId:string

  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  entityId:string
}

