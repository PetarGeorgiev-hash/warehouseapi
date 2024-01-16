import { IsString } from 'class-validator';

export class CreateClientDto {
  @IsString()
  uic: string;

  @IsString()
  clientName: string;
}
