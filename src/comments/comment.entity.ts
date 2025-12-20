import {Entity, PrimaryGeneratedColumn, Column,CreateDateColumn,} from 'typeorm';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  mensaje: string;

  @Column()
  ticketId: number;

  @CreateDateColumn()
  createdAt: Date;
}
