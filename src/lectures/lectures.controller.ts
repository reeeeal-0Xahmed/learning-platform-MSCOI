import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  BadRequestException
} from '@nestjs/common'

import { FileInterceptor } from '@nestjs/platform-express'

import { LecturesService } from './lectures.service'
import { CreateLectureDto } from './dto/create-lecture.dto'
import { UpdateLectureDto } from './dto/update-lecture.dto'

import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { RolesGuard } from '../common/guards/roles.guard'
import { Roles } from '../common/decorators/roles.decorator'
import { Role } from '../common/enums/role.enum'
import { Request } from 'express'
import { Req } from '@nestjs/common'
import type { RequestWithUser } from '../common/INTERFACE/request-with-user.interface'
import { CloudinaryService } from '../infrastructure/cloudinary/cloudinary.service'
import { NotFoundException } from '@nestjs/common'

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('lectures')
export class LecturesController {

  constructor(
    private lecturesService: LecturesService,
    private cloudinaryService: CloudinaryService
  ) {}

  @Post()
  @Roles(Role.ADMIN, Role.SUPERADMIN)
  create(@Body() body: CreateLectureDto) {
    return this.lecturesService.create(body)
  }

 @Get('chapter/:chapterId')
@Roles(Role.STUDENT, Role.ADMIN, Role.SUPERADMIN)
findByChapter(
  @Param('chapterId') chapterId: string,
  @Req() req: RequestWithUser
) {

  const userId = req.user.userId
  const role = req.user.role

  return this.lecturesService.findByChapter(
    chapterId,
    userId,
    role
  )

}

  @Patch(':id')
  @Roles(Role.ADMIN, Role.SUPERADMIN)
  update(
    @Param('id') id: string,
    @Body() body: UpdateLectureDto
  ) {
    return this.lecturesService.update(id, body)
  }

  @Delete(':id')
  @Roles(Role.SUPERADMIN)
  remove(@Param('id') id: string) {
    return this.lecturesService.remove(id)
  }
@Get('single/:id')
@UseGuards(JwtAuthGuard)
getLecture(@Param('id') id: string) {
  return this.lecturesService.findOne(id)
}

  @Post('upload/:id')
  @Roles(Role.ADMIN, Role.SUPERADMIN)
@UseInterceptors(FileInterceptor('video', {
  limits: { fileSize: 500000000 },
 fileFilter: (req, file, cb) => {

  if (!file.mimetype.startsWith('video/')) {
    return cb(new BadRequestException('Only videos allowed'), false)
  }

  cb(null, true)

}
  }))
  
  async uploadVideo(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File
  )
   {

    if (!file) {
      throw new BadRequestException('Video file is required')
    }

    const result = await this.cloudinaryService.uploadVideo(file)

    return this.lecturesService.attachVideo(id, {
      publicId: result.public_id,
      duration: Math.floor(result.duration),
      format: result.format,
      url: result.secure_url
    })

  }
@Get('stream/:id')
@UseGuards(JwtAuthGuard)
async stream(@Param('id') id: string){

  const lecture = await this.lecturesService.findOne(id)

if (!lecture) {
  throw new NotFoundException('Lecture not found')
}

if (!lecture.videoPublicId) {
  throw new NotFoundException('Video not uploaded')
}

return {
  url: `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/video/upload/q_auto/f_auto/${lecture.videoPublicId}`
}
}

}