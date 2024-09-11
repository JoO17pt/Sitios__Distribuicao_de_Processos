import connection from "../database/database.js";
import Sequelize from "sequelize";

const LawSuit = connection.define("lawSuits", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  courtID: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  courtName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  beginDate: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  endDate: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  datas: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  stringDate: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  intervenientes: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  processo: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  informacao: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});

// connection.sync({force: true});

export default LawSuit;
