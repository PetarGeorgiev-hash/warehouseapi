import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Warehouse } from 'src/entities/warehouse.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WarehouseService {
  constructor(
    @InjectRepository(Warehouse) private repo: Repository<Warehouse>,
  ) {}

  async getAllWarehouses() {
    return this.repo.find();
  }

  async findWarehouse(id: string) {
    const warehouse = await this.repo.findOneBy({ id: id });

    if (!warehouse) {
      throw new NotFoundException('warehouse with this id does not exist');
    }
    return warehouse;
  }

  async createWarehouse(warehouseObj: Partial<Warehouse>): Promise<Warehouse> {
    return await this.repo.save({
      name: warehouseObj.name,
      type: warehouseObj.type,
    });
  }

  async updateWarehouse(id: string, warehouseObj: Partial<Warehouse>) {
    const warehouse = await this.findWarehouse(id);
    Object.assign(warehouse, warehouseObj);
    return this.repo.save(warehouse);
  }

  async deleteWarehouse(id: string) {
    await this.findWarehouse(id);
    return this.repo.softDelete(id);
  }
}
