import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('asignacionTicket')
export class AsignacionTicket {
  @PrimaryGeneratedColumn('uuid')
  id_asignacion: string;

  @Column()
  id_ticket: string;

  @Column()
  id_tecnico: string;

  @Column()
  fecha_asignacion: Date;
}
