import connection from "../database/database.js";
import Sequelize from "sequelize";

const Validation = connection.define("validations", {
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
  lawSuitsFetched: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  lawSuitsExpected: {
    type: Sequelize.INTEGER,
    allowNull: false,
  }
});

// connection.sync({force: true});

export default Validation;
