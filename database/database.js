import Sequelize from "sequelize";

import dotenv from "dotenv";
dotenv.config({ path: "./config/config.env" });

// const connection = new Sequelize('APPDOZE','root','root',{
const connection = new Sequelize('APPDOZE',process.env.DBUSER,process.env.DBPASS,{
    // host: 'localhost',
    host: process.env.HOST,
    port: process.env.PORT,
    // host: '0.tcp.eu.ngrok.io',
    // port: '15921',
    dialect: 'mysql',
    logging: true
});

export default connection;
