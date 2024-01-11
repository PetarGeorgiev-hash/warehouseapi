import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

enum WarehouseType {
  liquid = 'liquid',
  nonLiquid = 'non-liquid',
}

@Entity()
export class Warehouse {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: WarehouseType,
    default: WarehouseType.liquid,
  })
  type: WarehouseType;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @CreateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @CreateDateColumn({ name: 'deleted_at', default: null })
  deletedAt: Date;
}
