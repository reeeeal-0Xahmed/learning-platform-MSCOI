import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../infrastructure/database/prisma.service'
import { CreateChapterDto } from './dto/create-chapter.dto'
import { UpdateChapterDto } from './dto/update-chapter.dto'
import { Request } from 'express'
import { Req } from '@nestjs/common'
import { ForbiddenException } from '@nestjs/common'
@Injectable()
export class ChaptersService {

  constructor(private prisma: PrismaService) {}

  async create(data: CreateChapterDto) {

    return this.prisma.chapter.create({
      data
    })

  }

async findByCourse(courseId: string, userId: string, role: string) {

  if (role === 'STUDENT') {

    const enrollment = await this.prisma.enrollment.findFirst({
      where: {
        userId,
        courseId
      }
    })

    if (!enrollment) {
      throw new ForbiddenException('User not enrolled')
    }

  }

  return this.prisma.chapter.findMany({
    where: { courseId },
    orderBy: { order: 'asc' },
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