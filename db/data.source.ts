import { DataSourceOptions, DataSource } from 'typeorm';

export const source: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'nest',
  database: 'warehouseNest',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
  synchronize: false,
  port: 8000,
};

const dataSource = new DataSource(source);
export default dataSource;
