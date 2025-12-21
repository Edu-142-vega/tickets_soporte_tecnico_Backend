import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
  @Column()
  precio: string;

  @Column({ default: 'disponible' })
  estado: string; 

  @Column()
  fecha_creacion: string;
}
