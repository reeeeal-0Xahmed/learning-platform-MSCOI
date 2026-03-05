import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../infrastructure/database/prisma.service'
import { CreateChapterDto } from './dto/create-chapter.dto'
import { UpdateChapterDto } from './dto/update-chapter.dto'

@Injectable()
export class ChaptersService {

  constructor(private prisma: PrismaService) {}

  async create(data: CreateChapterDto) {

    return this.prisma.chapter.create({
      data
    })

  }

  async findByCourse(courseId: string) {

    return this.prisma.chapter.findMany({
      where: { courseId },
      include: {
        lectures: true
      }
    })

  }

  async update(id: string, data: UpdateChapterDto) {

    const chapter = await this.prisma.chapter.findUnique({
      where: { id }
    })

    if (!chapter) {
      throw new NotFoundException('Chapter not found')
    }

    return this.prisma.chapter.update({
      where: { id },
      data
    })

  }

  async remove(id: string) {

    const chapter = await this.prisma.chapter.findUnique({
      where: { id }
    })

    if (!chapter) {
      throw new NotFoundException('Chapter not found')
    }

    return this.prisma.chapter.delete({
      where: { id }
    })

  }

}