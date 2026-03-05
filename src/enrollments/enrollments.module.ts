import { Module } from '@nestjs/common'
import { EnrollmentsService } from './enrollments.service'
import { EnrollmentsController } from './enrollments.controller'
import { PrismaModule } from '../infrastructure/database/prisma.module'

@Module({
  imports: [PrismaModule],
  providers: [EnrollmentsService],
  controllers: [EnrollmentsController],
})
export class EnrollmentsModule {}