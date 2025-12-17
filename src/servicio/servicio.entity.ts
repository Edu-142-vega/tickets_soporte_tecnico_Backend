import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('servicios')
export class Servicio {
  @PrimaryGeneratedColumn('uuid')
  id_servicio: string;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @Column()
  tipo: string; 

  @Column('decimal', { precision: 10, scale: 2 })
  precio: number;

  @Column()
  estado: string; 

  @CreateDateColumn()
  fecha_creacion: Date;
}
