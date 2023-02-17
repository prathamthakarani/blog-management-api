import { IsNotEmpty } from 'class-validator';
export class CreateBlogkDto {
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: string;
}
