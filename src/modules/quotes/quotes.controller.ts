import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { CreateQuoteDto, UpdateQuoteDto } from './dto';
import { ParseMongoIdPipe } from '@/shared/pipes/parse-mongo.pipe';
import { ApiTags, ApiResponse, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard, RolesGuard } from '@/modules/auth/guards';
import { Roles } from '../auth/decorators/role.decorator';
import { UserRoleEnum } from '../auth/enums';

@ApiTags('Quotes')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('quotes')
export class QuotesController {
  constructor(private readonly quotesSvc: QuotesService) { }

  @ApiOperation({ summary: 'Create quote' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Created' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden resource' })
  @Roles(UserRoleEnum.Admin, UserRoleEnum.Writer)
  @Post('/')
  async add(@Body() payload: CreateQuoteDto) {
    return this.quotesSvc.add(payload)
  }

  @ApiOperation({ summary: 'Get quote by id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'OK' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not found' })
  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  async findById(@Param('id', ParseMongoIdPipe) id: string) {
    return this.quotesSvc.findById(id)
  }

  @ApiOperation({ summary: 'Delete quote by id' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Quote deleted' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not found' })
  @Roles(UserRoleEnum.Admin)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  async deleteById(@Param('id', ParseMongoIdPipe) id: string) {
    return this.quotesSvc.deleteById(id)
  }

  @ApiOperation({ summary: 'Update quote by id' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Quote updated' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not found' })
  @Roles(UserRoleEnum.Admin, UserRoleEnum.Writer)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Put('/:id')
  async updateById(@Param('id', ParseMongoIdPipe) id: string,
    @Body() payload: UpdateQuoteDto) {
    return this.quotesSvc.update(id, payload)
  }
}
