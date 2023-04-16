import contactModel from "../models/contactInfoModel.js";

export const create = (req, res, next) => {

  const { socialMedia, aboutUs } = req.body;
  const logo = req.body.contact;
  const social = contactModel.create({
    socialMedia: socialMedia,
    logo: logo,
    aboutUs: aboutUs,
  });
  social
    .then((ress) => {
      if (!ress) {
        // const err = new Error(`Error creating contact`);
        // err.status = 404;
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
