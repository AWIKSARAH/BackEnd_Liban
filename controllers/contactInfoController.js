import contactModel from "../models/contactInfoModel.js";
import { deleteImage } from "../middleware/imageHandlerMiddleware.js";
import { NotFoundError } from "../errors.js";
export const create = (req, res, next) => {
  const { socialMedia, aboutUs } = req.body;
  const logo = req.body.image;
  const social = contactModel.create({
    socialMedia: socialMedia,
    logo: logo,
    aboutUs: aboutUs,
  });
  social
    .then((resp) => {
      if (!resp) {
        throw new NotFoundError("No Response from DB");
      }
      return res.status(200).json({ success: true, data: resp });
    })
    .catch((error) => {
      next(error);
    });
};

export const get = (req, res, next) => {
  contactModel
    .find({})
    .then((contact) => {
      if (!contact.length) {
        throw new NotFoundError("No contact found");
      }

      return res.status(200).json({ success: true, data: contact });
    })
    .catch((error) => {
      next(error);
    });
};

/**
 * Functioon to update a contact with Information
 */
export const updateContact = async (req, res) => {
  const _id = req.params.id;
  try {
    const oldContact = await contactModel.findOne({ _id: _id });

    if (!oldContact) {
      throw new NotFoundError("Contact not found")
    }

    const { socialMedia, aboutUs } = req.body;
    const logo = req.file.path || oldContact.logo;

    console.log(oldContact.logo);
    if (logo) {
      const imagePath = oldContact.logo;
      deleteImage(`${imagePath}`);
    } else {
      console.log("nonono");
    }

    const updatedContact = await contactModel.findByIdAndUpdate(
      oldContact._id,
      { socialMedia, logo, aboutUs },
      { new: true }
    );

    return res.status(200).json({ success: true, data: updatedContact });
  } catch (error) {
    console.error(error);
    next(error)
  }
};
