import {Controller,Post, Body,Param,Get,Query, UseGuards,} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { AuthGuard } from '@nestjs/passport';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post(':ticketId')
  create(
    @Param('ticketId') ticketId: number,
    @Body() dto: CreateCommentDto,
  ) {
    return this.commentsService.create(+ticketId, dto);
  }

  @Get()
  findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    const options: IPaginationOptions = {
      page: Number(page),
      limit: Number(limit),
    };

    return this.commentsService.findAll(options);
  }
}
