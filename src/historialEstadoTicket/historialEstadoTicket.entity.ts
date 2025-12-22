import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('historialEstadoTicket')
export class HistorialEstadoTicket {
  @PrimaryGeneratedColumn('uuid')
  id_historial: string;

  @Column()
  id_ticket: string;

  @Column()
  estado_anterior: string;

  @Column()
  estado_nuevo: string;

  @Column()
  fecha_cambio: Date;

  @Column({ nullable: true })
  comentario?: string;
}
