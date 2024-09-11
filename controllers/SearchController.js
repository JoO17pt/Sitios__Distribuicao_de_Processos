import User from "../models/User.js";
import connection from "../database/database.js";

import dotenv from "dotenv";
dotenv.config({ path: "./config/config.env" });

import validator from "validator";

const search = (req, res) => {
  switch (req.method) {
    case "GET":
      connection
        .query(
          `SELECT DISTINCT courtID, courtName FROM validations ORDER BY courtName ASC;`,
          { raw: true }
        )
        .then((courts) => {
          res.render("search", {
            courts: courts,
            method: "get",
            url: process.env.URL,
            user: req.session.user,
            message: null
          });
        });
      break;

    case "POST":
      let court = "";
      if (
        req.body.court != null &&
        req.body.court != "" &&
        req.body.court != undefined &&
        req.body.court != "Seleciona o tribunal"
      ) {
        court = `AND courtID = ` + req.body.court.trim();
      } else {
        court = "";
      }

      let intervenientes = "";
      if (
        req.body.intervenientes != null &&
        req.body.intervenientes != "" &&
        req.body.intervenientes != undefined
      ) {
        intervenientes =
          ` AND intervenientes LIKE "%` + req.body.intervenientes.trim() + `%"`;
      } else {
        intervenientes = "";
      }

      let processo = "";
      if (
        req.body.processo != null &&
        req.body.processo != "" &&
        req.body.processo != undefined
      ) {
        processo = ` AND processo LIKE "%` + req.body.processo.trim() + `%"`;
      } else {
        processo = "";
      }

      let informacao = "";
      if (
        req.body.informacoes != null &&
        req.body.informacoes != "" &&
        req.body.informacoes != undefined
      ) {
        informacao =
          ` AND informacao LIKE "%` + req.body.informacoes.trim() + `%"`;
      } else {
        informacao = "";
      }

      let beginDate = "";
      if (
        req.body.beginDate != null &&
        req.body.beginDate != "" &&
        req.body.beginDate != undefined
      ) {
        beginDate =
          ` AND STR_TO_DATE(CONCAT(LEFT(stringDate,2),'/',MID(stringDate,4,2),'/',RIGHT(stringDate,4)), '%d/%m/%Y') >= '` +
          req.body.beginDate +
          `'`;
      } else {
        beginDate = "";
      }

      console.log("end date");

      let endDate = "";
      if (
        req.body.endDate != null &&
        req.body.endDate != "" &&
        req.body.endDate != undefined
      ) {
        endDate =
          ` AND STR_TO_DATE(CONCAT(LEFT(stringDate,2),'/',MID(stringDate,4,2),'/',RIGHT(stringDate,4)), '%d/%m/%Y') <= '` +
          req.body.endDate +
          `'`;
      } else {
        endDate = "";
      }

      let page = "";
      if (
        req.body.page != null &&
        req.body.page != "" &&
        req.body.page != undefined
      ) {
        page = req.body.page;
      } else {
        page = 1;
      }

      connection
        .query(
          `SELECT DISTINCT courtID, courtName FROM validations ORDER BY courtName ASC;`,
          { raw: true }
        )
        .then((courts) => {
          connection
            .query(
              `SELECT COUNT(courtID) AS entries FROM lawSuits WHERE 1=1 ` +
                court +
                intervenientes +
                processo +
                informacao +
                beginDate +
                endDate
            )
            .then((entries) => {
              console.log(req.body);
              req.session.user == undefined
                ? console.log("Undefined")
                : console.log(req.session.user.email);
              console.log(entries[0][0].entries);
              connection
                .query(
                  `SELECT courtID, courtName, beginDate, endDate, datas, stringDate, intervenientes, processo, informacao, createdAt, updatedAt FROM lawSuits WHERE 1=1 ` +
                    court +
                    intervenientes +
                    processo +
                    informacao +
                    beginDate +
                    endDate +
                    ` LIMIT ` +
                    10 +
                    ` OFFSET ` +
                    (page - 1) * 10 +
                    `;`
                )
                .then((lawSuits) => {
                  if (entries[0][0].entries != 0 && req.session.user.billingScheme == 'clicks') {
                    User.update(
                      { clicks: (Number(req.session.user.clicks)-1) },
                      { where: { email: req.session.user.email } }
                    )
                    .then(()=> {
                      req.session.user.clicks = (Number(req.session.user.clicks)-1);
                      res.render("search", {
                        courts: courts,
                        lawSuits: lawSuits,
                        entries: entries[0][0].entries,
                        page: page,
                        request: req.body,
                        method: "post",
                        url: process.env.URL,
                        user: req.session.user,
                        message: null
                      });
                    })
                  } else {
                    res.render("search", {
                      courts: courts,
                      lawSuits: lawSuits,
                      entries: entries[0][0].entries,
                      page: page,
                      request: req.body,
                      method: "post",
                      url: process.env.URL,
                      user: req.session.user,
                      message: null
                    });
                  }
                  // =====================

                  // =====================
                });
            });
        });

      break;
  }
};
export default search;
