import { Injectable, BadRequestException } from '@nestjs/common'
import { PrismaService } from '../infrastructure/database/prisma.service'

@Injectable()
export class EnrollmentsService {

  constructor(private prisma: PrismaService) {}
  async enroll(userId: string, courseId: string) {
   const existing = await this.prisma.enrollment.findFirst({
    where: {
      userId,
      courseId
    }
  })

  if (existing) {
    return existing
  }

  return this.prisma.enrollment.create({
    data: {
      userId,
      courseId,
      progressPercent: 0
    }
  })
}
 async getUserEnrollments(userId: string) {
  return this.prisma.enrollment.findMany({
    where: {
      userId
    },
    include: {
      course: true
    }
  })

}


}