const HttpError = require("../models/http-error");
const Publication = require("../models/publication");

//GET METHODS
async function getPublications(req, res, next) {
  try {
    const publications = await Publication.find();
    res.status(201).json({ publications: publications });
  } catch (err) {
    console.log(err);
    return next(new HttpError("Error while trying to get publications", 500));
  }
}

async function getPublicationsByUserId(req, res, next) {
  try {
    const publications = await Publication.find({ userId: req.params.userId });
    res.status(201).json({ publications: publications });
  } catch (err) {
    console.log(err);
    return next(
      new HttpError("Error while trying to get publications by user id", 500)
    );
  }
}

async function getPublication(req, res, next) {
  try {
    const publication = await Publication.findOne({ _id: req.params.id });
    res.status(201).json({ publication: publication });
  } catch (err) {
    console.log(err);
    return next(new HttpError("Error while trying to get publication", 500));
  }
}

//POST METHODS
async function createPublication(req, res, next) {
  try {
    const { title, imageName, description, userId } = req.body;

    let publication = await new Publication({
      title,
      imageName,
      description,
      userId,
    });
    await publication.save();
    res.status(201).json({
      status: "Publication created successfulluy",
      id: publication.id,
    });
  } catch (err) {
    console.log(err);
    return next(new HttpError("Error while trying to create publication", 500));
  }
}

//PATCH METHODS
//DELETE METHODS
async function deletePublication(req, res, next) {
  try {
    await Publication.deleteOne({ id: req.params.id });
    res.status(201).json({ status: "publication deleted successfully" });
  } catch (err) {
    console.log(err);
    return next(new HttpError("Error while trying to delete publication", 500));
  }
}

module.exports = {
  getPublications: getPublications,
  getPublicationsByUserId: getPublicationsByUserId,
  getPublication: getPublication,
  createPublication: createPublication,
  deletePublication: deletePublication,
};
