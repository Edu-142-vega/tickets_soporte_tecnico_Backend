import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tecnicos')
export class Tecnico {
  @PrimaryGeneratedColumn('uuid')
  id_tecnico: string;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column()
  correo: string;

  @Column()
  telefono: string;

  @Column()
  especialidad: string;

  @Column()
  estado: string;
}
