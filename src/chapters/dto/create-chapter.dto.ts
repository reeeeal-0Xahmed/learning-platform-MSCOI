import { IsString, IsInt } from 'class-validator'

export class CreateChapterDto {

  @IsString()
  courseId: string

  @IsInt()
  order: number

}