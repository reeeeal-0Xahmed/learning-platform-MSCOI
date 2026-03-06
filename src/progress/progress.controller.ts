import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Req,
  UseGuards
} from '@nestjs/common'

import { ProgressService } from './progress.service'
import { UpdateProgressDto } from './dto/update-progress.dto'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { Request } from 'express'
import type { RequestWithUser } from '../common/INTERFACE/request-with-user.interface'

@Controller('progress')
export class ProgressController {

  constructor(private progressService: ProgressService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  update(@Body() body: UpdateProgressDto, @Req() req: RequestWithUser) {

    const userSub = req.user.userId

    return this.progressService.updateProgress(
      userSub,
      body
    )

  }

  @Get(':lectureId')
  @UseGuards(JwtAuthGuard)
  get(@Param('lectureId') lectureId: string, @Req() req: RequestWithUser) {

    const userSub = req.user.userId

    return this.progressService.getLectureProgress(
      userSub,
      lectureId
    )

  }

}