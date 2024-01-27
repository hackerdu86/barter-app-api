const express = require("express");

const barterItemController = require("../controllers/barter-item-controller");
const router = express.Router();
const BASE_URL = "/barter-items";

//GET
router.get(BASE_URL, barterItemController.getBarterItems);
router.get(BASE_URL + "/users/:userId", barterItemController.getBarterItemsByUserId);
router.get(BASE_URL + "/:id", barterItemController.getBarterItem);

//POST
router.post(BASE_URL, barterItemController.createBarterItem);

//PATCH

//DELETE
router.delete(BASE_URL + "/:id", barterItemController.deleteBarterItem);

module.exports = router;
