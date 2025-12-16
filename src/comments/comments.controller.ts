import { Body, Controller, Param, Post } from "@nestjs/common";
import { CommentsService } from "./comments.service";
import { CreateCommentDto } from "./dto/create-comment.dto";

@Controller('tickets/:ticketId/comments')
export class CommentsController {
  constructor(private service: CommentsService) {}

  @Post()
  create(
    @Param('ticketId') ticketId: number,
    @Body() dto: CreateCommentDto,
  ) {
    return this.service.create(ticketId, dto);
  }
}
