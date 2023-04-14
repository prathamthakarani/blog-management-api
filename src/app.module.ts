import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogModule } from './blog/blog.module';
// import { UsersModule } from './users/users.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    BlogModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'blog-management',
      autoLoadEntities: true,
      logging: true,
      synchronize: true,
    }),
    UserModule,
  ],
})
export class AppModule {}
