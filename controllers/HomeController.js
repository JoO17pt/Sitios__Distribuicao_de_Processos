import dotenv from "dotenv";
import connection from "../database/database.js";

dotenv.config({ path: "./config/config.env" });

const home = (req, res) => {
  connection
    .query(`SELECT COUNT(id) AS NumberLawSuits FROM lawSuits`, { raw: true })
    .then((numberLawSuits) => {
      connection
        .query(
          `SELECT STR_TO_DATE(CONCAT(LEFT(lawSuits.stringDate, 2), '/', MID(lawSuits.stringDate, 4, 2), '/', RIGHT(lawSuits.stringDate, 4)), '%d/%m/%Y') AS stringDate FROM lawSuits ORDER BY stringDate DESC LIMIT 1`,
          { raw: true }
        )
        .then((lastLawSuit) => {
          res.render("home", {
            user: req.session.user,
            numberLawSuits: numberLawSuits[0][0].NumberLawSuits,
            lastLawSuit: lastLawSuit[0][0].stringDate,
            message: null,
          });
        });
    });
};
export default home;
