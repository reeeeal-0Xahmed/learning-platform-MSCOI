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
@Module({
  imports: [CoursesModule,CloudinaryModule, SupabaseModule, AuthModule, ChaptersModule , PrismaModule, LecturesModule, EnrollmentsModule, ProgressModule, AdminModule, RedisModule],
  controllers: [AppController],
  providers: [AppService],
   
})
export class AppModule {}
