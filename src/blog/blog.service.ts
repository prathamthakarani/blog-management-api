import { Injectable, NotFoundException } from '@nestjs/common';
import { BlogPost } from './blog.entity';
import { CreateBlogkDto } from './dto/create-post.dto';
import { BlogPostRepository } from './blog.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(BlogPostRepository)
    private blogPostRepository: BlogPostRepository,
  ) {}

  async getAllBlogs(): Promise<BlogPost[]> {
    return this.blogPostRepository.find();
  }

  async getBlogById(id: string): Promise<BlogPost> {
    const found = await this.blogPostRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Blog with id ${id} is not found`);
    }

    return found;
  }

  async updateBlog(
    id: number,
    updateBlogDto: UpdateBlogDto,
  ): Promise<BlogPost> {
    const blog = await this.blogPostRepository.findOne(id);

    if (!blog) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }

    blog.title = updateBlogDto.title;
    blog.content = updateBlogDto.content;

    return this.blogPostRepository.save(blog);
  }

  async deleteTask(id: string): Promise<void> {
    const result = await this.blogPostRepository.delete(id);
    // console.log(result);
    if (result.affected === 0) {
      throw new NotFoundException(`Blog with ${id} not found `);
    }
  }

  createBlog(createBlogDto: CreateBlogkDto): Promise<BlogPost> {
    return this.blogPostRepository.createBlog(createBlogDto);
  }

  async findAllBlogsWithUserId(userId: number): Promise<BlogPost[]> {
    const query = this.blogPostRepository
      .createQueryBuilder('blog')
      .leftJoinAndSelect('blog.user', 'user')
      .where('user.id = :userId', { userId });

    const blogs = await query.getMany();

    return blogs;
  }
}
