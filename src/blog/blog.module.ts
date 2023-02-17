import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogPostRepository } from './blog.repository';

@Module({
  imports: [TypeOrmModule.forFeature([BlogPostRepository])],
  providers: [BlogService],
  controllers: [BlogController],
})
export class BlogModule {}
