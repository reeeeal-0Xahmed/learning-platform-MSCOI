import { IsString, IsInt, IsOptional } from 'class-validator'

export class CreateLectureDto {

  @IsString()
  chapterId: string

  @IsString()
  type: string

  @IsOptional()
  @IsString()
  videoPublicId?: string

  @IsInt()
  durationSec: number

  @IsInt()
  order: number

}