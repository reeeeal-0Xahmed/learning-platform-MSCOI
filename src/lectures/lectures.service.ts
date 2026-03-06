import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../infrastructure/database/prisma.service'
import { CreateLectureDto } from './dto/create-lecture.dto'
import { UpdateLectureDto } from './dto/update-lecture.dto'
import { ForbiddenException } from '@nestjs/common'

@Injectable()
export class LecturesService {

  constructor(private prisma: PrismaService) {}

  async create(data: CreateLectureDto) {

    return this.prisma.lecture.create({
      data
    })

  }

 async findByChapter(chapterId: string, userId: string, role: string) {

     
     if (role === 'STUDENT') {
         
 const chapter = await this.prisma.chapter.findUnique({
  where: { id: chapterId }
})

if (!chapter) {
  throw new NotFoundException('Chapter not found')
}

const enrolled = await this.prisma.enrollment.findFirst({
  where: {
    userId,
    courseId: chapter.courseId
  }
})

    if (!enrolled) {
      throw new ForbiddenException('Not enrolled')
    }

  }

  return this.prisma.lecture.findMany({
    where: { chapterId },
    orderBy: { order: 'asc' }
  })

}
async findOne(id: string) {

  const lecture = await this.prisma.lecture.findUnique({
    where: { id }
  })

  if (!lecture) {
    throw new NotFoundException('Lecture not found')
  }

  return lecture

}
  async update(id: string, data: UpdateLectureDto) {

    const lecture = await this.prisma.lecture.findUnique({
      where: { id }
    })

    if (!lecture) {
      throw new NotFoundException('Lecture not found')
    }

    return this.prisma.lecture.update({
      where: { id },
      data
    })

  }

  async remove(id: string) {

    const lecture = await this.prisma.lecture.findUnique({
      where: { id }
    })

    if (!lecture) {
      throw new NotFoundException('Lecture not found')
    }

    return this.prisma.lecture.delete({
      where: { id }
    })

  }
  async attachVideo(
  lectureId: string,
  data: {
    publicId: string
    duration: number
    format: string
    url: string
  }

) {


  return this.prisma.lecture.update({
    where: { id: lectureId },
    data: {
      videoPublicId: data.publicId,
      durationSec: data.duration
    }
  })


}

}