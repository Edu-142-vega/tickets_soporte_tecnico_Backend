import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tickets')
export class Ticket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  titulo: string;

  @Column('text')
  descripcion: string;

  @Column({ default: 'abierto' })
  estado: string;

  @Column({ default: 'media' })
  prioridad: string;
}
