import {Injectable,InternalServerErrorException,} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {paginate,IPaginationOptions,Pagination,} from 'nestjs-typeorm-paginate';
import { Comment } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly repository: Repository<Comment>,
  ) {}

  async create(
    ticketId: number,
    dto: CreateCommentDto,
  ): Promise<Comment> {
    try {
      const comment = this.repository.create({
        mensaje: dto.mensaje,
        ticketId,
      });

      return await this.repository.save(comment);
    } catch (error) {
      console.error('Error al crear comentario:', error);
      throw new InternalServerErrorException(
        'No se pudo crear el comentario',
      );
    }
  }


  async findAll(
    options: IPaginationOptions,
  ): Promise<Pagination<Comment>> {
    try {
      const queryBuilder = this.repository
        .createQueryBuilder('comment')
        .orderBy('comment.createdAt', 'DESC');

      return await paginate<Comment>(queryBuilder, options);
    } catch (error) {
      console.error('Error al listar comentarios:', error);
      throw new InternalServerErrorException(
        'No se pudieron obtener los comentarios',
      );
    }
  }
}
