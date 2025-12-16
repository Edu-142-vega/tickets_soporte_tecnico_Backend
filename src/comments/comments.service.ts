import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  create(ticketId: number, dto: CreateCommentDto) {
    return {
      message: 'Comentario creado correctamente',
      ticketId,
      comentario: dto,
    };
  }
}
