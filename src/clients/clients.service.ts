import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from 'src/entities/client.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client) private clientRepo: Repository<Client>,
  ) {}

  async getClient(id: string) {
    const client = await this.clientRepo.findOne({ where: { id: id } });
    return client;
  }
  async getAllClients() {
    const clients = await this.clientRepo.find();
    return clients;
  }

  async createClient(clientObj: Partial<Client>) {
    const client = await this.clientRepo.save({
      uic: clientObj.uic,
      clientName: clientObj.clientName,
      date: new Date(),
      deletedAt: null,
    });

    return client;
  }

  async updateClient(clientObj: Partial<Client>) {
    const updatedClient = await this.clientRepo.save(clientObj);
    return updatedClient;
  }

  async deleteClient(id: string) {
    const client = await this.getClient(id);
    client.deletedAt = new Date();
    return client;
  }
}
