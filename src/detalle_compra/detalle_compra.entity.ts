import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('detalle_compras')
export class Detalle_compra {
  @PrimaryGeneratedColumn('uuid')
  id_detalle_compra: string;

  @Column()
  id_compra: string;

  @Column()
  id_producto: string;

  @Column()
  cantidad: string;

  @Column()
  precio_unitario: string;

  @Column()
  subtotal: string;
}
