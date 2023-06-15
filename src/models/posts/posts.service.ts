import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Post from 'src/entities/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}
}
