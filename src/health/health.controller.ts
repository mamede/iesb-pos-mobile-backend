import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  HealthCheckService,
  HealthCheck,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
@ApiTags('healthz')
@Controller('v1/healthz')
export class HealthController {
  constructor(
    private healthCheckService: HealthCheckService,
    private typeOrmHealthIndicator: TypeOrmHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  @ApiOperation({
    summary: 'Route to check health of database.',
    description: 'Returns database status, if okay its show "up".',
  })
  check() {
    return this.healthCheckService.check([
      () => this.typeOrmHealthIndicator.pingCheck('database'),
    ]);
  }
}
