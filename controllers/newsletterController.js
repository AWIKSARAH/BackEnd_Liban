import model from "../models/newsletterModel.js";

const create = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        success: false,
        error: "Email is required",
      });
    }
    const data = await model.create({ email });
    res.status(200).json({ success: true, data });
  } catch (error) {
    if (error.code === 11000) {
      const errorMessage = "You are already subscribed to our newsletter";
      return res.status(400).json({ success: false, error: errorMessage });
    }
    res.status(500).json({ success: false, error: error });
  }
};

/**
 * Get a list of newsLetter
 */
const get = async (req, res) => {
  const options = {
    page: req.query.page || 1,
    limit: req.query.limit || 10,
  };
  const filters = {};
  try {
    if (req.query.email) {
      filters.email = { $regex: new RegExp("^" + req.query.email, "i") };
    }
    const data = await model.paginate(filters, options);
 
    if (!data.docs.length) {
      return res.status(404).json({
        success: true,
        message: 'No NewsLetter found',
      })
    }    res.status(200).json({ success: true, data: data });
  } catch (error) {
    res.status(500).json({ success: false, error: error });
  }
};
const news = { create, get };
export default news;
