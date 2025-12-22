import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tecnicos')
export class Tecnico {
  @PrimaryGeneratedColumn('uuid')
  id_tecnico: string;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column({ unique: true })
  correo: string;

  @Column()
  telefono: string;

  @Column()
  especialidad: string; 

  @Column({ default: 'activo' })
  estado: string; 
}
