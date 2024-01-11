import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { source } from 'db/data.source';
import { ClientsModule } from './clients/clients.module';

@Module({
  imports: [TypeOrmModule.forRoot(source), ClientsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
