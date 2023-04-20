import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Iesb Backend')
  .setDescription('Api de exercicio backend')
  .setVersion('1.0')
  .build();
