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
import { Transfer } from './transfer.entity';
import { Product } from './product.entity';
import { Warehouse } from './warehouse.entity';

@Entity()
export class TransferDetails {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Transfer)
  @JoinColumn({ name: 'transfer_id' })
  transferId: Transfer;

  @OneToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  productId: Product;

  @OneToOne(() => Warehouse)
  @JoinColumn({ name: 'warehouse_id' })
  warehouseId: Warehouse;

  @Column()
  quantity: number;

  @Column({ name: 'total_price' })
  totalPrice: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', default: null })
  deletedAt: Date;
}
