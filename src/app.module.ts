import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoursesModule } from './courses/courses.module';
import { ChaptersModule } from './chapters/chapters.module';
import { LecturesModule } from './lectures/lectures.module';
import { EnrollmentsModule } from './enrollments/enrollments.module';
import { ProgressModule } from './progress/progress.module';
import { AdminModule } from './admin/admin.module';
import { PrismaModule } from './infrastructure/database/prisma.module'
import { AuthModule } from './auth/auth.module';
import { CloudinaryModule } from './infrastructure/cloudinary/cloudinary.module';
import { SupabaseModule } from './infrastructure/supabase/supabase.module';
import { RedisModule } from './infrastructure/redis/redis.module'
import { ThrottlerModule } from '@nestjs/throttler'
@Module({
  imports: [
      ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 100
      }
    ]),
  PrismaModule,
  RedisModule,
  CloudinaryModule,
  SupabaseModule,
  AuthModule,

  CoursesModule,
  ChaptersModule,
  LecturesModule,
  EnrollmentsModule,
  ProgressModule,  
  AdminModule,
],
  controllers: [AppController],
  providers: [AppService],
   
})
export class AppModule {}
