const express = require("express");

const publicationController = require("../controllers/publication-controller");
const router = express.Router();
const BASE_URL = "/publications";

//GET
router.get(BASE_URL, publicationController.getPublications);
router.get(BASE_URL + "/users/:userId", publicationController.getPublicationsByUserId);
router.get(BASE_URL + "/:id", publicationController.getPublication);

//POST
router.post(BASE_URL, publicationController.createPublication);

//PATCH

//DELETE
router.delete(BASE_URL + "/:id", publicationController.deletePublication);


module.exports = router;
