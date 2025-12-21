import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MensajeTicket } from './mensaje-ticket.schema';
import { CreateMensajeTicketDto } from './dto/create-mensaje-ticket.dto';

@Injectable()
export class MensajesTicketService {
  constructor(
    @InjectModel(MensajeTicket.name) private readonly mensajeModel: Model<MensajeTicket>,
  ) {}

  async create(dto: CreateMensajeTicketDto): Promise<MensajeTicket | null> {
    try {
      const mensaje = new this.mensajeModel(dto);
      return await mensaje.save();
    } catch (err) {
      console.error('Error creando mensaje:', err);
      return null;
    }
  }

  async findAll(options: { page: number; limit: number }): Promise<any | null> {
    try {
      const { page, limit } = options;
      const mensajes = await this.mensajeModel.find()
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ fecha_mensaje: -1 });

      return { items: mensajes, page, limit };
    } catch (err) {
      console.error('Error retrieving mensajes:', err);
      return null;
    }
  }

  async findByTicket(id_ticket: number, options: { page: number; limit: number }): Promise<any | null> {
    try {
      const { page, limit } = options;
      const mensajes = await this.mensajeModel.find({ id_ticket })
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ fecha_mensaje: -1 });

      return { items: mensajes, page, limit };
    } catch (err) {
      console.error('Error retrieving mensajes by ticket:', err);
      return null;
    }
  }
}
