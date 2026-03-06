import {  Inject, Injectable, NotFoundException } from '@nestjs/common'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { PrismaService } from '../infrastructure/database/prisma.service'
import { CreateCourseDto } from './dto/create-course.dto'
import { UpdateCourseDto } from './dto/update-course.dto'
import type { Cache } from 'cache-manager'

@Injectable()
export class CoursesService {

  constructor(
    private prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cache: Cache
  ) {}

  async findAll() {

    const cached = await this.cache.get('courses')

    if (cached) {
      return cached
    }

    const courses = await this.prisma.course.findMany({
      include: {
        chapters: {
          include: {
            lectures: true
          }
        }
      }
    })

    await this.cache.set('courses', courses, 60 )

    return courses
  }

  async findOne(id: string) {

    const course = await this.prisma.course.findUnique({
      where: { id },
      include: {
        chapters: {
          include: {
            lectures: true
          }
        }
      }
    })

    if (!course) {
      throw new NotFoundException('Course not found')
    }

    return course
  }
async getCourseContent(courseId: string) {

  return this.prisma.course.findUnique({
    where: { id: courseId },
    include: {
      chapters: {
        orderBy: { order: 'asc' },
        include: {
          lectures: {
            orderBy: { order: 'asc' }
          }
        }
      }
    }
  })

}
  async create(data: CreateCourseDto) {

    const course = await this.prisma.course.create({
      data
    })

    await this.cache.del('courses')

    return course
  }

  async update(id: string, data: UpdateCourseDto) {

    await this.findOne(id)

    const course = await this.prisma.course.update({
      where: { id },
      data
    })

    await this.cache.del('courses')

    return course
  }

  async remove(id: string) {

    await this.findOne(id)

    const course = await this.prisma.course.delete({
      where: { id }
    })

    await this.cache.del('courses')

    return course
  }
}