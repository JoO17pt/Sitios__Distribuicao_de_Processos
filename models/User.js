import connection from "../database/database.js";
import Sequelize from "sequelize";

const User = connection.define("users", {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  billingScheme: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  expirationDate: {
    type: Sequelize.DATE,
    allowNull: true,
  },
  clicks: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  valid: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  }
});

// connection.sync({force: true});

export default User;
