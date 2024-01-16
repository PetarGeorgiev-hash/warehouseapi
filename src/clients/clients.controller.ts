import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dtos/create-clinet.dto';
import { UpdateClientDto } from './dtos/update-client.dto';
import { AuthGurad } from 'guards/auth.guard';
import { Roles } from 'src/decorators/role.decorator';
import { RolesGuard } from 'guards/roles.guard';

@UseGuards(AuthGurad, RolesGuard)
@Controller('clients')
export class ClientsController {
  constructor(private clientService: ClientsService) {}

  @Get()
  getAllClients() {
    return this.clientService.getAllClients();
  }

  @Post()
  @Roles('operator')
  createClient(@Body() client: CreateClientDto) {
    return this.clientService.createClient(client);
  }
  @Patch('/:id')
  @Roles('operator')
  updateUser(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() client: UpdateClientDto,
  ) {
    return this.clientService.updateClient(id, client);
  }
  @Delete('/:id')
  @Roles('owner')
  deleteClient(@Param('id', new ParseUUIDPipe()) id: string) {
    console.log(id);
    return this.clientService.deleteClient(id);
  }
}
