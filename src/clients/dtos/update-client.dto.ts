import { IsString, IsUUID } from 'class-validator';

export class UpdateClientDto {
  @IsUUID()
  id: string;

  @IsString()
  clientName: string;
}
