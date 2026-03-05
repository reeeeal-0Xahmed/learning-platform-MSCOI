import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Body,
  UseGuards
} from '@nestjs/common'

import { LecturesService } from './lectures.service'
import { CreateLectureDto } from './dto/create-lecture.dto'
import { CloudinaryService } from '../infrastructure/cloudinary/cloudinary.service'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { RolesGuard } from '../common/guards/roles.guard'
import { Roles } from '../common/decorators/roles.decorator'
import { Role } from '../common/enums/role.enum'

@Controller('lectures')
export class LecturesController {

 constructor(
  private lecturesService: LecturesService,
  private cloudinaryService: CloudinaryService) {}

 @Post('upload')
 @UseGuards(JwtAuthGuard, RolesGuard)
 @Roles(Role.ADMIN, Role.SUPERADMIN)
 async upload(@Body() body: any) {

  const result = await this.cloudinaryService.uploadVideo(
    body.file
  )
 return {
    publicId: result.public_id,
    duration: result.duration
  }
 }

  @Get(':chapterId')
  findByChapter(@Param('chapterId') chapterId: string) {
    return this.lecturesService.findByChapter(chapterId)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPERADMIN)
  delete(@Param('id') id: string) {
    return this.lecturesService.delete(id)
  }

}