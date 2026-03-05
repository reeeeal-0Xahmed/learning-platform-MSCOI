import { IsString, IsInt, IsBoolean } from 'class-validator'

export class UpdateProgressDto {

  @IsString()
  lectureId: string

  @IsInt()
  watchedSeconds: number

  @IsBoolean()
  completed: boolean

}