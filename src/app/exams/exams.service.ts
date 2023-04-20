import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { ICreateExamDTO } from '@app/exams/dtos/ICreateExamDTO';
import { IUpdateExamDTO } from '@app/exams/dtos/IUpdateExamDTO';
import { ExamsEntity } from '@app/exams/entities/exam.entity';

@Injectable()
export class ExamsService {
  constructor(
    @InjectRepository(ExamsEntity)
    private readonly repository: Repository<ExamsEntity>,
  ) {}

  async findAll(): Promise<ExamsEntity[]> {
    return await this.repository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: string): Promise<ExamsEntity> {
    return await this.repository.findOne({
      where: { id: id },
    });
  }

  async findByName(name: string): Promise<ExamsEntity> {
    return await this.repository.findOne({
      where: { name: name },
    });
  }

  async store({ name, grade }: ICreateExamDTO) {
    const examAlreadyExists = await this.findByName(name);

    if (examAlreadyExists) {
      throw new NotFoundException('Exam already exists!');
    }

    const user = this.repository.create({
      name,
      grade,
    });

    await this.repository.save(user);
  }

  async update(id: string, data: IUpdateExamDTO) {
    const exam = await this.findOne(id);
    this.repository.merge(exam, data);
    return await this.repository.save(exam);
  }

  async destroy(id: string) {
    await this.findOne(id);
    this.repository.softDelete({ id });
  }
}
