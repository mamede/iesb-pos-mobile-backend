import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamsController } from '@app/exams/exams.controller';
import { ExamsEntity } from '@app/exams/entities/exam.entity';
import { ExamsService } from '@app/exams/exams.service';

@Module({
  imports: [TypeOrmModule.forFeature([ExamsEntity])],
  controllers: [ExamsController],
  providers: [ExamsService],
  exports: [ExamsService],
})
export class ExamsModule {}
