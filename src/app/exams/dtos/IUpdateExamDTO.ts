import { PartialType } from '@nestjs/swagger';
import { ICreateExamDTO } from './ICreateExamDTO';

export class IUpdateExamDTO extends PartialType(ICreateExamDTO) {}
