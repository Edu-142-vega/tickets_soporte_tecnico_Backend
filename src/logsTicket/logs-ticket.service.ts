import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { LogTicket } from './log-ticket.schema';
import { CreateLogTicketDto } from './dto/create-log-ticket.dto';
import { UpdateLogTicketDto } from './dto/update-log-ticket.dto';

@Injectable()
export class LogsTicketService {
  constructor(
    @InjectModel(LogTicket.name) private readonly logModel: Model<LogTicket>,
  ) {}

  async create(dto: CreateLogTicketDto): Promise<LogTicket | null> {
    try {
      const log = new this.logModel(dto);
      return await log.save();
    } catch (err) {
      console.error('Error creando log:', err);
      return null;
    }
  }

  async findAll(options: { page: number; limit: number }): Promise<any | null> {
    try {
      const { page, limit } = options;

      const logs = await this.logModel.find()
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ fecha_evento: -1 });

      return { items: logs, page, limit };
    } catch (err) {
      console.error('Error retrieving logs:', err);
      return null;
    }
  }

  async findByTicket(id_ticket: number, options: { page: number; limit: number }): Promise<any | null> {
    try {
      const { page, limit } = options;

      const logs = await this.logModel.find({ id_ticket })
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ fecha_evento: -1 });

      return { items: logs, page, limit };
    } catch (err) {
      console.error('Error retrieving logs by ticket:', err);
      return null;
    }
  }

  async update(id: string, dto: UpdateLogTicketDto): Promise<LogTicket | null> {
    try {
      const updated = await this.logModel.findByIdAndUpdate(
        id,
        { $set: dto },
        { new: true },
      );

      return updated;
    } catch (err) {
      console.error('Error updating log:', err);
      return null;
    }
  }

  async remove(id: string): Promise<LogTicket | null> {
    try {
      const deleted = await this.logModel.findByIdAndDelete(id);
      return deleted;
    } catch (err) {
      console.error('Error deleting log:', err);
      return null;
    }
  }
}
