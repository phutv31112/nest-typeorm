import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './models/posts/posts.module';
import { UsersModule } from './models/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from './entities/user.entity';
import Post from './entities/post.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [User, Post],
      synchronize: true,
      autoLoadEntities: true,
    }),
    AuthModule,
    PostsModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
