import { IsEnum, IsString } from 'class-validator';

enum WarehouseType {
  liquid = 'liquid',
  nonLiquid = 'non-liquid',
}

export class WarehouseDTO {
  @IsString()
  name: string;

  @IsEnum(WarehouseType, { message: 'Invalid warehouse type' })
  type: WarehouseType;
}
