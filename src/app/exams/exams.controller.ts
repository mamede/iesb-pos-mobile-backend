import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ExamsService } from '@app/exams/exams.service';
import { ICreateExamDTO } from '@app/exams/dtos/ICreateExamDTO';
import { IUpdateExamDTO } from '@app/exams/dtos/IUpdateExamDTO';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Exams')
@UseGuards(AuthGuard('jwt'))
@Controller('exams')
export class ExamsController {
  constructor(private readonly service: ExamsService) {}

  @Get()
  @ApiOperation({
    summary: 'Get list of all exams',
    description: 'Returns 200 and show all users',
  })
  find() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() createExamDto: ICreateExamDTO) {
    return this.service.store(createExamDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExamDto: IUpdateExamDTO) {
    return this.service.update(id, updateExamDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.destroy(id);
  }
}
