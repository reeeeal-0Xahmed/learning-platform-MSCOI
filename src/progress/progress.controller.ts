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

@Controller('progress')
export class ProgressController {

  constructor(private progressService: ProgressService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  update(@Body() body: UpdateProgressDto, @Req() req: any) {

    const userId = req.user.userId

    return this.progressService.updateProgress(
      userId,
      body
    )

  }

  @Get(':lectureId')
  @UseGuards(JwtAuthGuard)
  get(@Param('lectureId') lectureId: string, @Req() req: any) {

    const userId = req.user.userId

    return this.progressService.getLectureProgress(
      userId,
      lectureId
    )

  }

}