const express = require("express");

const userController = require("../controllers/user-controller");
const router = express.Router();
const BASE_URL = "/users";

//GET
router.get(BASE_URL + "/:email/:rawPassword", userController.getUserId);

//POST
router.post(BASE_URL, userController.createUser);

//PATCH

//DELETE


module.exports = router;
