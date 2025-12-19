import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { paginate,IPaginationOptions, Pagination,} from 'nestjs-typeorm-paginate';
import { Comment } from './comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly repository: Repository<Comment>,
  ) {}

  async create(ticketId: number, dto: CreateCommentDto): Promise<Comment> {
  const comment = this.repository.create({
    mensaje: dto.mensaje,
    ticketId,
  });

  return this.repository.save(comment);
}


  async findAll(
    options: IPaginationOptions,
  ): Promise<Pagination<Comment>> {
    const queryBuilder = this.repository
      .createQueryBuilder('comment')
      .orderBy('comment.createdAt', 'DESC');

    return paginate<Comment>(queryBuilder, options);
  }
}
