import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class MensajeTicket extends Document {
  @Prop({ required: true })
  id_ticket: number;

  @Prop({ required: true })
  id_usuario: number;

  @Prop({ required: true })
  rol_usuario: string; 

  @Prop({ required: true })
  mensaje: string;

  @Prop({ required: true })
  fecha_mensaje: Date;

  @Prop({ required: true, default: false })
  leido: boolean;
}

export const MensajeTicketSchema = SchemaFactory.createForClass(MensajeTicket);
