import { Body, Controller, Param, Post } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('tickets/:ticketId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(
    @Param('ticketId') ticketId: string,
    @Body() dto: CreateCommentDto,
  ) {
    return this.commentsService.create(Number(ticketId), dto);
  }
}
