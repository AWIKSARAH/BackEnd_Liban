
import contactModel from "../models/contactInfoModel.js";
import {deleteImage} from '../middleware/imageHandlerMiddleware.js'
export const create = (req, res, next) => {

  const { socialMedia, aboutUs } = req.body;
  const logo = req.body.image;
  const social = contactModel.create({
    socialMedia: socialMedia,
    logo: logo,
    aboutUs: aboutUs,
  });
  social
    .then((ress) => {
      if (!ress) {
      res.status(500).json({ success: false, error: err });
      }
      return res.status(200).json({ success: true, data: ress });
    })
    .catch((err) => {
      res.status(500).json({ success: false, error: err });
    });
};

export const get = (req, res, next) => {
  contactModel
    .find({})
    .then((contact) => {
      if (!contact.length) {
        return res
          .status(404)
          .json({
            success: true,
            data: "No Info Found !Try to add new Contact",
          });
      }

      return res.status(200).json({ success: true, data: contact });
    })
    .catch((err) => {
      return next(err);
    });
};


/** 
 * Functioon to update a contact with Information 
 */
export const updateContact = async (req, res) => {
  const _id = req.params.id;
  try {
    const oldContact = await contactModel.findOne({_id:_id});

    if (!oldContact) {
      return res.status(404).json({ success: false, error: "Contact not found" });
    }

    const { socialMedia, aboutUs } = req.body;
    const logo = req.file.path || oldContact.logo;

    console.log(oldContact.logo);
    if (logo) {
      const imagePath = oldContact.logo
      deleteImage(`${imagePath}`);
    } else{console.log('nonono');}

    const updatedContact = await contactModel.findByIdAndUpdate(
      oldContact._id,
      { socialMedia, logo, aboutUs },
      { new: true }
    );

    return res.status(200).json({ success: true, data: updatedContact });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error });
  }
}