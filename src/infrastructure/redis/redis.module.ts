import { Module } from '@nestjs/common'
import { CacheModule } from '@nestjs/cache-manager'

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      ttl: 60
    })
  ]
})
export class RedisModule {}