import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
    create(ticketId: number, dto: CreateCommentDto) {
        throw new Error("Method not implemented.");
    }
}
