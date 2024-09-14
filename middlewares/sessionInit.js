import connection from "../database/database.js";

function sessionInit(req, res, next) {
  if (
    req.session.user != undefined &&
    req.session.user.valid == true &&
    ((req.session.user.billingScheme == "clicks" &&
      req.session.user.clicks > 0) ||
      (req.session.user.billingScheme == "subscription" &&
        new Date(req.session.user.expirationDate) > new Date()))
  ) {
    next();
  } else if (req.session.user == undefined) {
    res.redirect("/users/login");
  } else {
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
            message: true,
          });
        });
    });
  }
}

export default sessionInit;
