import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Client } from './client.entity';

enum TransferType {
  buyIn = 'buy-in',
  transfer = 'transfer',
  sell = 'sell',
}

@Entity()
export class Transfer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'transfer_type',
    type: 'enum',
    enum: TransferType,
    default: TransferType.buyIn,
  })
  transferType: TransferType;

  @OneToOne(() => Client)
  @JoinColumn({ name: 'consumer_id' })
  consumerId: Client;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', default: null })
  deletedAt: Date;
}
