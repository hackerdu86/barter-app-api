const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const HttpError = require("./models/http-error");

//Controller assignation

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


app.use((requete, reponse, next) => {
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

app.listen(5000);
console.log("Successfully connected to the data base");
console.log("App running");
