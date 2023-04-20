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
    description: 'Returns 200 and show all exams',
  })
  find() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get list of exam by id',
    description: 'Returns 200 and show the exam',
  })
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.service.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Create exam',
    description: 'Returns 201 and create new exam',
  })
  create(@Body() createExamDto: ICreateExamDTO) {
    return this.service.store(createExamDto);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update exam',
    description:
      'Returns 200 new infos exam, you need to put only info you want to change',
  })
  update(@Param('id') id: string, @Body() updateExamDto: IUpdateExamDTO) {
    return this.service.update(id, updateExamDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete exam',
    description: 'Returns 200 and delete exam',
  })
  remove(@Param('id') id: string) {
    return this.service.destroy(id);
  }
}
