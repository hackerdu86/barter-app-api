const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const HttpError = require("./models/http-error");
const BASE_URL = "/api";

//Controller assignation
const userRoutes = require("./routes/user-routes");
const barterItemRoutes = require("./routes/barter-item-routes");
const publicationRoutes = require("./routes/publication-routes");

//Main app
const app = express();

app.use(bodyParser.json());

//Allowing requests from anywhere
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST, PATCH, DELETE");
  next();
});

//Route definitions
app.use(BASE_URL, userRoutes);
app.use(BASE_URL, barterItemRoutes);
app.use(BASE_URL, publicationRoutes);

app.use((req, res, next) => {
  return next(new HttpError("Route not found", 404));
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({
    message: error.message || "An unknown error occured",
  });
});

mongoose.set("strictQuery", true);

mongoose
  .connect(
    "mongodb+srv://hackerdu86:<" +
      process.env.DB_PASSWORD +
      ">@cluster-gestion-de-stag.b2wvhmb.mongodb.net/"
  )
  .then(() => {
    app.listen(3306);
    console.log("Successfully connected to the data base");
    console.log("App running");
  })
  .catch((erreur) => {
    console.log(erreur);
  });
