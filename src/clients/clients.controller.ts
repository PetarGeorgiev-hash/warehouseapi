import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dtos/create-client.dto';
import { UpdateClientDto } from './dtos/update-client.dto';

//add delete to the clients

@Controller('clients')
export class ClientsController {
  constructor(private clientService: ClientsService) {}

  @Get()
  getAllClients() {
    return this.clientService.getAllClients();
  }

  @Post()
  createClient(@Body() client: CreateClientDto) {
    return this.clientService.createClient(client);
  }
  @Patch('')
  updateUser(@Body() client: UpdateClientDto) {
    return this.clientService.updateClient(client);
  }
  @Delete('')
  deleteClient(@Param('id') id: string) {
    return this.clientService.deleteClient(id);
  }
}
