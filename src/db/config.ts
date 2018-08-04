import {Sequelize} from 'sequelize-typescript';

import { User } from '../models/userModel';

const sequelize = new Sequelize({
    database: 'some_db',
    dialect: 'sqlite',
    username: 'root',
    password: '',
    storage: ':memory:',
    modelPaths: [__dirname + '/models']
});

sequelize.addModels([User])
//sequelize.addModels(['path/to/models']);