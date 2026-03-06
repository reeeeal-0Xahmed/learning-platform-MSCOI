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
import type { RequestWithUser } from '../common/INTERFACE/request-with-user.interface'

@Controller('enrollments')
export class EnrollmentsController {

  constructor(private enrollmentsService: EnrollmentsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  enroll(@Body() body: EnrollDto, @Req() req: RequestWithUser) {

   const userSub = req.user.userId

    return this.enrollmentsService.enroll(
      userSub,
      body.courseId
    )

  }
@Get()
@UseGuards(JwtAuthGuard)
myCourses(@Req() req: RequestWithUser) {

  const userSub = req.user.userId

  return this.enrollmentsService.getUserEnrollments(userSub)

}

}