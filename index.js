// ============================================================= Module import + Variable declaration ==============================================================

import http from "http";
import express from "express";
import session from "express-session";
import connection from "./database/database.js";

import dotenv from "dotenv";
dotenv.config({ path: "./config/config.env" });

import search from "./routes/search.js";
import users from "./routes/users.js";
import home from "./routes/home.js";

connection
  .authenticate()
  .then(() => {
    console.log("Conexão feita com a base de dados");
  })
  .catch((msgErro) => {
    console.log(msgErro);
  });


http
  .createServer(
    express()
    .set("view engine", "ejs")
    .use(
      express.urlencoded({
        extended: true,
      }),
      session({
        secret: process.env.SECRET,
        resave: true,
        saveUninitialized: true,
        cookie: { maxAge: 3000000000 },
      }),
      express.static("public")
    )
    .use("/search/", search)
    .use("/users/", users)
    .use("/", home)
  )
  .listen(4000);
console.log("The server is live!");
