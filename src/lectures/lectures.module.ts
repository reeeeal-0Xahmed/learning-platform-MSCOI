import { Module } from '@nestjs/common'
import { LecturesController } from './lectures.controller'
import { LecturesService } from './lectures.service'
import { PrismaModule } from '../infrastructure/database/prisma.module'
import { CloudinaryModule } from '../infrastructure/cloudinary/cloudinary.module'
@Module({
  imports: [PrismaModule, CloudinaryModule],
  controllers: [LecturesController],
  providers: [LecturesService],
})
export class LecturesModule {}