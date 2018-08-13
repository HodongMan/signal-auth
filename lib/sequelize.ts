import {Sequelize} from 'sequelize-typescript';

export const sequelize = new Sequelize({
  dialect: 'mysql',
  operatorsAliases: Sequelize.Op as any,
  database: 'test',
  username: 'root',
  password: '1234',
  modelPaths: [__dirname + '/models']
});
