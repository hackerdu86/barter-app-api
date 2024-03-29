const HttpError = require("../models/http-error");
const User = require("../models/user");
const Produit = require("../models/barter-item");
const crypto = require("crypto");
const demande = require("../models/demande");
//GET METHODS
async function getUserId(req, res, next) {
  const { email, rawPassword } = req.params;
  try {
    let user = await User.find({ email: email });
    if (user.length === 1) {
      if (user[0].password === hashQuery(rawPassword)) {
        res.status(200).json({
          status: "Credentials valid!",
          userId: user[0].id,
        });
      } else {
        return next(new HttpError("Invalid credentials ", 500));
      }
    } else {
      return next(new HttpError("The user does not exist ", 500));
    }
  } catch (err) {
    console.log(err);
    return next(new HttpError("There was an error checking credentials", 500));
  }
}

async function getUserInfo(req, res, next) {
  try {
    let user = await User.findOne({ _id: req.params.id });
    res.status(200).json({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  } catch (err) {
    console.log(err);
    return next(
      new HttpError("Error while trying to retrieve user information", 500)
    );
  }
}

//POST METHODS
async function createUser(req, res, next) {
  const { firstName, lastName, email, rawPassword } = req.body;

  //Hash password
  const password = hashQuery(rawPassword);
  try {
    let user = await User.find({ email: email });
    console.log("user", user);
    if (user.length === 0) {
      const usertoAdd = new User({
        firstName,
        lastName,
        email,
        password,
        products: [],
        demande: [],
      });
      await usertoAdd.save();
      res.status(201).json({ response: "User was successfully created!" });
    } else {
      return next(new HttpError("The email is already used", 500));
    }
  } catch (err) {
    console.log(err);
    return next(new HttpError("Error while creating user", 500));
  }
}

const demandeEchange = async (requete, reponse, next) => {
  const { userId, produitId, description } = requete.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return next(new HttpError("L'utilisateur n'existe pas.", 404));
    }

    const produit = await Produit.findById(produitId);
    if (!produit) {
      return next(new HttpError("Le produit n'existe pas.", 404));
    }

    // Creation de demande
    const auteur = await User.findById(produit.userId);
    if (!auteur) {
      return next(new HttpError("L'auteur du produit n'existe pas.", 404));
    }
    const demandeInstance = new demande({
      auteur: auteur._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      description,
      userId,
    });
    auteur.demande.push(demandeInstance);
    user.products.push(produit._id);

    await demandeInstance.save();
    await user.save();
    await auteur.save();

    reponse.status(200).json({ message: "L'utilisateur a faite la demande avec succes." });
  } catch (err) {
    console.error(err);
    return next(new HttpError("Une erreur s'est produite lors de la demande.", 500));
  }
};

//PATCH METHODS
//DELETE METHODS

//UTILS
function hashQuery(query) {
  return crypto.createHash("md5").update(query).digest("hex").toString();
}

module.exports = {
  getUserId: getUserId,
  getUserInfo: getUserInfo,
  createUser: createUser,
  demandeEchange: demandeEchange,
};
