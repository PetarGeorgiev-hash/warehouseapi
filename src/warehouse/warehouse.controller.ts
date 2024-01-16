import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGurad } from 'guards/auth.guard';
import { RolesGuard } from 'guards/roles.guard';
import { WarehouseService } from './warehouse.service';
import { WarehouseDTO } from './dtos/create-warehouse.dto';
import { Roles } from 'src/decorators/role.decorator';

@UseGuards(AuthGurad, RolesGuard)
@Controller('warehouse')
export class WarehouseController {
  constructor(private warehouseService: WarehouseService) {}

  @Get()
  getAllWarehouses() {
    return this.warehouseService.getAllWarehouses();
  }

  @Post()
  @Roles('operator')
  createWarehouse(@Body() warehouse: WarehouseDTO) {
    return this.warehouseService.createWarehouse(warehouse);
  }

  @Patch('/:id')
  @Roles('operator')
  updateWarehouse(@Param('id') id: string, @Body() warehouse: WarehouseDTO) {
    console.log(warehouse.type);
    console.log(id);
    return this.warehouseService.updateWarehouse(id, warehouse);
  }

  @Delete('/:id')
  @Roles('owner')
  deleteWarehouse(@Param('id') id: string) {
    return this.warehouseService.deleteWarehouse(id);
  }
}
