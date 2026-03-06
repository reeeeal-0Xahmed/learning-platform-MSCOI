import { Injectable } from '@nestjs/common'
import { PrismaService } from '../infrastructure/database/prisma.service'
import { UpdateProgressDto } from './dto/update-progress.dto'
import { SupabaseService } from 'src/infrastructure/supabase/supabase.service'
import { LectureProgress } from '@prisma/client'
import { ForbiddenException } from '@nestjs/common'
@Injectable()
export class ProgressService {

  constructor(
    private prisma: PrismaService,
    private supabase: SupabaseService
  ) {}
    async updateProgress(userId: string, data: UpdateProgressDto) {

    let progress : LectureProgress

  const existing = await this.prisma.lectureProgress.findUnique({
  where: {
    userId_lectureId: {
      userId,
      lectureId: data.lectureId
    }
  }
})
    if (existing) {

      progress = await this.prisma.lectureProgress.update({
        where: { id: existing.id },
        data: {
          watchedSeconds: data.watchedSeconds,
          completed: data.completed
        }
      })

    } else {

      progress = await this.prisma.lectureProgress.create({
        data: {
          userId,
          lectureId: data.lectureId,
          watchedSeconds: data.watchedSeconds,
          completed: data.completed
        }
      })

    }

    if (data.completed) {
      await this.updateCourseProgress(userId, data.lectureId)
    }

    await this.supabase
      .getClient()
      .channel('progress')
      .send({
        type: 'broadcast',
        event: 'progress_updated',
        payload: {
          userId,
          lectureId: data.lectureId,
          watchedSeconds: data.watchedSeconds,
          completed: data.completed
        }
      })

    return progress
  }
  

 async updateCourseProgress(userId: string, lectureId: string) {

  const lecture = await this.prisma.lecture.findUnique({
    where: { id: lectureId },
    include: { chapter: true }
  })

  if (!lecture) {
    throw new Error('Lecture not found')
  }

  const courseId = lecture.chapter.courseId

  const enrolled = await this.prisma.enrollment.findFirst({
    where: {
      userId,
      courseId
    }
  })

  if (!enrolled) {
    throw new ForbiddenException('User not enrolled')
  }

  const lectures = await this.prisma.lecture.findMany({
    where: {
      chapter: {
        courseId
      }
    },
    select: { id: true }
  })

  const lectureIds = lectures.map(l => l.id)

  const totalLectures = lectureIds.length

  const completedLectures = await this.prisma.lectureProgress.count({
    where: {
      userId,
      completed: true,
      lectureId: {
        in: lectureIds
      }
    }
  })

  const percent =
    totalLectures === 0
      ? 0
      : Math.round((completedLectures / totalLectures) * 100)

  await this.prisma.enrollment.updateMany({
    where: {
      userId,
      courseId
    },
    data: {
      progressPercent: percent
    }
  })

}
  async getLectureProgress(userId: string, lectureId: string) {

    return this.prisma.lectureProgress.findFirst({
      where: {
        userId,
        lectureId
      }
    })

  }

}