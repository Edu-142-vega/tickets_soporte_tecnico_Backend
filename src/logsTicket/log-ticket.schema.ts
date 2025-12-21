import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class LogTicket extends Document {
  @Prop({ required: true })
  id_ticket: number;

  @Prop({ required: true })
  estado_anterior: string;

  @Prop({ required: true })
  estado_nuevo: string;

  @Prop({ required: true })
  accion: string;

  @Prop({ required: true })
  realizado_por: number;

  @Prop({ required: true })
  rol: string; // cliente | tecnico | sistema

  @Prop({ required: true })
  fecha_evento: Date;

  @Prop()
  observacion?: string;
}

export const LogTicketSchema = SchemaFactory.createForClass(LogTicket);
