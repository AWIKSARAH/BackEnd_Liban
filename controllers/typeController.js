// controllers/types.js
import TypeModel from "../models/type.js";

const createType = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newType = await TypeModel.create({ name, description });
    res.status(201).json(newType);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getTypes = async (req, res) => {
  try {
    const types = await TypeModel.find();
    res.json(types);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export { createType, getTypes };

