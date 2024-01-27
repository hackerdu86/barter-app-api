const HttpError = require("../models/http-error");
const BarterItem = require("../models/barter-item");

//GET METHODS
async function getBarterItems(req, res, next) {}

async function getBarterItem(req, res, next) {}

//POST METHODS
async function createBarterItem(req, res, next) {}

//PATCH METHODS
//DELETE METHODS
async function deleteBarterItem(req, res, next) {}

module.exports = {
  getBarterItems: getBarterItems,
  getBarterItem: getBarterItem,
  createBarterItem: createBarterItem,
  deleteBarterItem: deleteBarterItem,
};
