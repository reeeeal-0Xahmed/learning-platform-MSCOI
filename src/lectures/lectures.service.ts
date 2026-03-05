import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../infrastructure/database/prisma.service'
import { CreateLectureDto } from './dto/create-lecture.dto'

@Injectable()
export class LecturesService {

  constructor(private prisma: PrismaService) {}

  async create(data: CreateLectureDto) {

    return this.prisma.lecture.create({
      data
    })

  }

  async findByChapter(chapterId: string) {

    return this.prisma.lecture.findMany({
      where: { chapterId },
      orderBy: {
        order: 'asc'
      }
    })

  }

  async delete(id: string) {

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

}