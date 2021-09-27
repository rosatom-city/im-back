import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import { Dialect } from "sequelize/types";

const option:SequelizeOptions = {
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  database: process.env.DB_DATABASE,
  dialect: process.env.DB_DIALECT as Dialect,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  storage: ':memory:',
  modelPaths: [__dirname + '/**/*.model.*'],
  // operatorsAliases: false,
  logging: false, // console.log,
  // pool: {
  //   max: 5,
  //   min: 1,
  //   acquire: 30000,
  //   idle: 10000
  // }
};


const sequelize = new Sequelize(option);

export default sequelize;