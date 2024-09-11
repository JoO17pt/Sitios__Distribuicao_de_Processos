import Sequelize from "sequelize";

const connection = new Sequelize('APPDOZE','root','root',{
    // host: 'localhost',
    host: 'tcp://0.tcp.eu.ngrok.io',
    port: '18825',
    dialect: 'mysql',
    logging: true
});

export default connection;