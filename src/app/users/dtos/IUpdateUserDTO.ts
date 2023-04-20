import { PartialType } from '@nestjs/swagger';
import { ICreateUserDTO } from '@app/users/dtos/ICreateUserDTO';

export class IUpdateUserDTO extends PartialType(ICreateUserDTO) {}
