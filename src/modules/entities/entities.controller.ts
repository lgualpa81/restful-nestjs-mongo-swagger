import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { EntitiesService } from './entities.service';
import { CreateEntityDto, UpdateEntityDto } from './dto';
import { ParseMongoIdPipe } from 'src/shared/pipes/parse-mongo.pipe';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard, RolesGuard } from 'src/modules/auth/guards';
import { Roles } from '../auth/decorators/role.decorator';
import { UserRoleEnum } from '../auth/enums';


@ApiTags('Entities')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('entities')
export class EntitiesController {
  constructor(private readonly entitiesSvc: EntitiesService) { }

  @ApiOperation({ summary: 'Create entity' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Entity created' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden resource' })
  @Roles(UserRoleEnum.Admin, UserRoleEnum.Writer)
  @Post('/')
  async add(@Body() payload: CreateEntityDto) {
    return this.entitiesSvc.add(payload)
  }

  @ApiOperation({ summary: 'Get entity by id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'OK' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not found' })
  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  async findById(@Param('id', ParseMongoIdPipe) id: string) {
    return this.entitiesSvc.findById(id)
  }

  @ApiOperation({ summary: 'Delete entity by id' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Entity deleted' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not found' })
  @Roles(UserRoleEnum.Admin)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  async deleteById(@Param('id', ParseMongoIdPipe) id: string) {
    return this.entitiesSvc.deleteById(id)
  }

  @ApiOperation({ summary: 'Update entity by id' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Entity updated' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not found' })
  @Roles(UserRoleEnum.Admin, UserRoleEnum.Writer)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Put('/:id')
  async updateById(@Param('id', ParseMongoIdPipe) id: string,
    @Body() payload: UpdateEntityDto) {
    return this.entitiesSvc.update(id, payload)
  }
}
