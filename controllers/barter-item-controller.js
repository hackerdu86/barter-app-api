const HttpError = require("../models/http-error");
const BarterItem = require("../models/barter-item");

//GET METHODS
async function getBarterItems(req, res, next) {
  try {
    const barterItems = await BarterItem.find();
    res.status(201).json({ barterItems: barterItems });
  } catch (err) {
    console.log(err);
    return next(new HttpError("Error while trying to get barter items", 500));
  }
}

async function getBarterItemsByUserId(req, res, next) {
  try {
    const barterItems = await BarterItem.find({ userId: req.params.userId });
    res.status(201).json({ barterItems: barterItems });
  } catch (err) {
    console.log(err);
    return next(
      new HttpError("Error while trying to get barter items by user id", 500)
    );
  }
}

async function getBarterItem(req, res, next) {
  try {
    const barterItem = await BarterItem.findOne({ _id: req.params.id });
    res.status(201).json({ barterItem: barterItem });
  } catch (err) {
    console.log(err);
    return next(new HttpError("Error while trying to get barter item", 500));
  }
}

//POST METHODS
async function createBarterItem(req, res, next) {
  try {
    const { title, imageName, description, address, userId } = req.body;

    let barterItem = await new BarterItem({
      title,
      imageName,
      description,
      address,
      userId,
    });
    await barterItem.save();
    res.status(201).json({
      status: "Barter item created successfulluy",
      id: barterItem.id,
    });
  } catch (err) {
    console.log(err);
    return next(
      new HttpError("Error while trying to create barter items", 500)
    );
  }
}

//PATCH METHODS
//DELETE METHODS
async function deleteBarterItem(req, res, next) {
  try {
    await BarterItem.deleteOne({ id: req.params.id });
    res.status(201).json({ status: "barter item deleted successfully" });
  } catch (err) {
    console.log(err);
    return next(
      new HttpError("Error while trying to delete barter item", 500)
    );
  }
}

module.exports = {
  getBarterItems: getBarterItems,
  getBarterItemsByUserId: getBarterItemsByUserId,
  getBarterItem: getBarterItem,
  createBarterItem: createBarterItem,
  deleteBarterItem: deleteBarterItem,
};
