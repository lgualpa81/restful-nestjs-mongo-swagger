import { Controller, Get, Post, Body, Param, Delete, Put, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto, UpdateCustomerDto } from './dto';
import { ParseMongoIdPipe } from '@/shared/pipes/parse-mongo.pipe';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard, RolesGuard } from '@/modules/auth/guards';
import { UserRoleEnum } from '../auth/enums';
import { Roles } from '../auth/decorators/role.decorator';

@ApiTags('Customers')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersSvc: CustomersService) { }

  @ApiOperation({ summary: 'Create customer' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Created' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden resource' })
  @Roles(UserRoleEnum.Admin, UserRoleEnum.Writer)
  @Post('/')
  async add(@Body() payload: CreateCustomerDto) {
    return this.customersSvc.add(payload)
  }

  @ApiOperation({ summary: 'Get customer by id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'OK' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not found' })
  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  async findById(@Param('id', ParseMongoIdPipe) id: string) {
    return this.customersSvc.findById(id)
  }

  @ApiOperation({ summary: 'Delete customer by id' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Customer deleted' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not found' })
  @Roles(UserRoleEnum.Admin)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  async deleteById(@Param('id', ParseMongoIdPipe) id: string) {
    return this.customersSvc.deleteById(id)
  }

  @ApiOperation({ summary: 'Update customer by id' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Customer updated' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not found' })
  @Roles(UserRoleEnum.Admin, UserRoleEnum.Writer)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Put('/:id')
  async updateById(@Param('id', ParseMongoIdPipe) id: string,
    @Body() payload: UpdateCustomerDto) {
    return this.customersSvc.update(id, payload)
  }
}
