import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('detalle_compras')
export class Detalle_compra {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
}
