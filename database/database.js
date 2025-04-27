import Sequelize from "sequelize";

import dotenv from "dotenv";
dotenv.config({ path: "./config/config.env" });

const connection = new Sequelize(process.env.DB_NAME,process.env.DB_USER,process.env.DB_PASS,{
    // host: 'localhost',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false,


});

export default connection;
