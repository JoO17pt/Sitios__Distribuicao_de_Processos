import Sequelize from "sequelize";

const connection = new Sequelize('APPDOZE','root','root',{
    // host: 'localhost',
    host: '2.tcp.eu.ngrok.io',
    port: '12751',
    dialect: 'mysql',
    logging: true
});

export default connection;
