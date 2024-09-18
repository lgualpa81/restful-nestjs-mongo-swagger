import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { PoliciesService } from './policies.service';
import { CreatePolicyDto, UpdatePolicyDto } from './dto';
import { ParseMongoIdPipe } from '@/shared/pipes/parse-mongo.pipe';
import { ApiTags, ApiResponse, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard, RolesGuard } from '@/modules/auth/guards';
import { Roles } from '../auth/decorators/role.decorator';
import { UserRoleEnum } from '../auth/enums';

@ApiTags('Policies')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('policies')
export class PoliciesController {
  constructor(private readonly policiesSvc: PoliciesService) { }

  @ApiOperation({ summary: 'Create policy' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Created' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden resource' })
  @Roles(UserRoleEnum.Admin, UserRoleEnum.Writer)
  @Post('/')
  async add(@Body() payload: CreatePolicyDto) {
    return this.policiesSvc.add(payload)
  }

  @ApiOperation({ summary: 'Get policy by id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'OK' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not found' })
  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  async findById(@Param('id', ParseMongoIdPipe) id: string) {
    return this.policiesSvc.findById(id)
  }

  @ApiOperation({ summary: 'Delete policy by id' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Policy deleted' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not found' })
  @Roles(UserRoleEnum.Admin)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  async deleteById(@Param('id', ParseMongoIdPipe) id: string) {
    return this.policiesSvc.deleteById(id)
  }

  @ApiOperation({ summary: 'Update policy by id' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Policy updated' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not found' })
  @Roles(UserRoleEnum.Admin, UserRoleEnum.Writer)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Put('/:id')
  async updateById(@Param('id', ParseMongoIdPipe) id: string,
    @Body() payload: UpdatePolicyDto) {
    return this.policiesSvc.update(id, payload)
  }
}
