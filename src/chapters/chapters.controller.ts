import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  Req
} from '@nestjs/common'

import { Request } from 'express'

import { ChaptersService } from './chapters.service'
import { CreateChapterDto } from './dto/create-chapter.dto'
import { UpdateChapterDto } from './dto/update-chapter.dto'
import type { RequestWithUser } from '../common/INTERFACE/request-with-user.interface'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { RolesGuard } from '../common/guards/roles.guard'
import { Roles } from '../common/decorators/roles.decorator'
import { Role } from '../common/enums/role.enum'



@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('chapters')
export class ChaptersController {

  constructor(private chaptersService: ChaptersService) {}

  @Post()
  @Roles(Role.ADMIN, Role.SUPERADMIN)
  create(@Body() body: CreateChapterDto) {
    return this.chaptersService.create(body)
  }

  @Get(':courseId')
  @Roles(Role.STUDENT, Role.ADMIN, Role.SUPERADMIN)
  findByCourse(
    @Param('courseId') courseId: string,
    @Req() req: RequestWithUser
  ) {

    const userId = req.user.userId
    const role = req.user.role

    return this.chaptersService.findByCourse(courseId, userId, role)
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.SUPERADMIN)
  update(
    @Param('id') id: string,
    @Body() body: UpdateChapterDto
  ) {
    return this.chaptersService.update(id, body)
  }

  @Delete(':id')
  @Roles(Role.SUPERADMIN)
  remove(@Param('id') id: string) {
    return this.chaptersService.remove(id)
  }

}