import {
  Controller,
  Post,
  Get,
  Body,
  Req,
  UseGuards
} from '@nestjs/common'

import { EnrollmentsService } from './enrollments.service'
import { EnrollDto } from './dto/enroll.dto'

import { JwtAuthGuard } from '../auth/jwt-auth.guard'

@Controller('enrollments')
export class EnrollmentsController {

  constructor(private enrollmentsService: EnrollmentsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  enroll(@Body() body: EnrollDto, @Req() req: any) {

    const userId = req.user.userId

    return this.enrollmentsService.enroll(
      userId,
      body.courseId
    )

  }

  @Get()
  @UseGuards(JwtAuthGuard)
  myCourses(@Req() req: any) {

    const userId = req.user.userId

    return this.enrollmentsService.getUserEnrollments(userId)

  }

}