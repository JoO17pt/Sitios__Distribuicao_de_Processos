import Sequelize from "sequelize";

const connection = new Sequelize('APPDOZE','root','root',{
    // host: 'localhost',
    host: '0.tcp.eu.ngrok.io',
    port: '14338',
    dialect: 'mysql',
    logging: true
});

export default connection;
