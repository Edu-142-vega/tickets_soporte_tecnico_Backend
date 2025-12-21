import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('compras')
export class Compra {
  @PrimaryGeneratedColumn('uuid')
  id_compra: string;

  @Column()
  id_cliente: string;

  @Column()
  fecha_compra: string;

  @Column()
  metodo_pago: string; 

  @Column()
  total: string;

  @Column({ default: 'pendiente' })
  estado: string; 
}
