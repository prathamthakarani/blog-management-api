import { Repository, EntityRepository } from 'typeorm';
import { BlogPost } from './blog.entity';
import { CreateBlogkDto } from './dto/create-post.dto';
@EntityRepository(BlogPost)
export class BlogPostRepository extends Repository<BlogPost> {
  async createBlog(createBlogDto: CreateBlogkDto): Promise<BlogPost> {
    const { userId, title, content } = createBlogDto;
    const blog = this.create({
      userId,
      title,
      content,
    });
    await this.save(blog);
    return blog;
  }
}
