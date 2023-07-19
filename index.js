
const express = require("express");
const app = express();
const router = require("./router");
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");

app.use(
  session({
    secret: "supersecretstuff",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(flash());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", router);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

module.exports = app;
const express = require("express");
const app = express();
const router = require("./router");
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");

app.use(
  session({
    secret: "supersecretstuff",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(flash());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", router);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

module.exports = app;
