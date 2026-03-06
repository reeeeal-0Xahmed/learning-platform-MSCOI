import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body
} from '@nestjs/common'
import { Roles } from '../common/decorators/roles.decorator'
import { Role } from '../common/enums/role.enum'
import { CoursesService } from './courses.service'
import { CreateCourseDto } from './dto/create-course.dto'
import { UpdateCourseDto } from './dto/update-course.dto'
import { UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { RolesGuard } from '../common/guards/roles.guard'

@Controller('courses')
export class CoursesController {

  constructor(private coursesService: CoursesService) {}

  @Get()
@UseGuards(JwtAuthGuard)
findAll() {
  return this.coursesService.findAll()
}

@Get(':id')
@UseGuards(JwtAuthGuard)
findOne(@Param('id') id: string) {
  return this.coursesService.findOne(id)
}
@Get(':id/content')
@UseGuards(JwtAuthGuard)
getContent(@Param('id') id: string) {
  return this.coursesService.getCourseContent(id)
}

@Post()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN, Role.SUPERADMIN)
create(@Body() body: CreateCourseDto) {
  return this.coursesService.create(body)
}
  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPERADMIN)
  update(
  @Param('id') id: string,
  @Body() body: UpdateCourseDto
   )  {
  return this.coursesService.update(id, body)
 }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPERADMIN)
  remove(@Param('id') id: string) {
  return this.coursesService.remove(id)
}

}