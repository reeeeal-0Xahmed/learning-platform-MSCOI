import { IsString, IsOptional, IsBoolean } from 'class-validator'

export class CreateCourseDto {

  @IsString()
  track: string

  @IsString()
  level: string

  @IsOptional()
  @IsString()
  thumbnailUrl?: string

  @IsOptional()
  @IsBoolean()
  isPublished?: boolean

}