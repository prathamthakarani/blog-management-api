import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { BlogPost } from './blog.entity';
import { BlogService } from './blog.service';
import { CreateBlogkDto } from './dto/create-post.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Controller('blog')
export class BlogController {
  constructor(private blogService: BlogService) {}
  @Get()
  async getAllBlogs(): Promise<BlogPost[]> {
    return this.blogService.getAllBlogs();
  }
  @Delete('/:id')
  deleteBlog(@Param('id') id: string): Promise<void> {
    return this.blogService.deleteTask(id);
  }
  @Get('/:id')
  getBlogById(@Param('id') id: string): Promise<BlogPost> {
    return this.blogService.getBlogById(id);
  }
  @Patch(':id')
  async updateBlog(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBlogDto: UpdateBlogDto,
  ): Promise<BlogPost> {
    return this.blogService.updateBlog(id, updateBlogDto);
  }
  @Post()
  createBlog(@Body() createBlogDto: CreateBlogkDto): Promise<BlogPost> {
    return this.blogService.createBlog(createBlogDto);
  }
}
