import dotenv from "dotenv";
dotenv.config({ path: "./config/config.env" });
import connection from "../database/database.js";

import bcrypt from "bcryptjs";
import Users from "../models/User.js";

const register = (req, res) => {
  switch (req.method) {
    case "GET":
      res.render("users/register", { user: req.session.user, message: null });
      break;
    case "POST":
      Users.findOne({ where: { email: req.body.email } }).then((user) => {
        if (
          user == undefined &&
          (req.body.billingScheme == "subscription" ||
            req.body.billingScheme == "clicks")
        ) {
          var salt = bcrypt.genSaltSync(10);
          var hash = bcrypt.hashSync(req.body.password, salt);

          let expirationDate = null;
          let clicks = null;

          req.body.billingScheme == "subscription"
            ? (expirationDate = new Date(
                new Date().setMonth(new Date().getMonth() + 1)
              ))
            : (clicks = 50);

          Users.create({
            email: req.body.email,
            password: hash,
            billingScheme: req.body.billingScheme,
            expirationDate: expirationDate,
            clicks: clicks,
            valid: 1,
          })
            .then(() => {
              res.render("users/login", {
                user: req.session.user,
                message: null,
                message1: true,
              });
              console.log('Novo utilizador registado: '+req.body.email);
              console.log(req.body);
            })
            .catch((err) => {
              res.render("users/register", {
                user: req.session.user,
                message: err,
              });
            });
        } else {
          res.render("users/register", {
            user: req.session.user,
            message: "Email já existe",
          });
        }
      });
      break;
  }
};
const login = (req, res) => {
  switch (req.method) {
    case "GET":
      res.render("users/login", {
        user: req.session.user,
        message: null,
        message1: null,
      });
      break;
    case "POST":
      var email = req.body.email;
      var password = req.body.password;

      Users.findOne({ where: { email: email } }).then((user) => {
        if (user != undefined) {
          var correct = bcrypt.compareSync(password, user.password);

          if (correct) {
            req.session.user = {
              email: user.email,
              billingScheme: user.billingScheme,
              expirationDate: user.expirationDate,
              clicks: user.clicks,
              valid: user.valid,
            };
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
                  message: true,
                });
              });
              console.log('Utilizador efetuou login: '+req.body.email)
          } else {
            res.render("users/login", {
              user: req.session.user,
              message: "Password errada",
              message1: null,
            });
          }
        } else {
          res.render("users/login", {
            user: req.session.user,
            message: "Email não existente",
            message1: null,
          });
        }
      });
      break;
  }
};

const logout = (req, res) => {
  console.log('Utilizador efetuou logout: '+req.session.user.email)
  req.session.destroy();
  res.redirect("/");
};

export { login, register, logout };
