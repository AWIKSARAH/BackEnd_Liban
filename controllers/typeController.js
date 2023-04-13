import TypeModel from "../models/type.js";
class TypeController {
    async  create (req, res) {
    try {
      const { name, description } = req.body;
      const newType = await TypeModel.create({ name, description });
      res.status(201).json({success:true,newType});
    } catch (error) {
      console.error(error);
      res.status(500).json({success:false, message: "Server error" });
    }
  };

  async read  (req, res)  {
    try {
      const types = await TypeModel.find();
      res.json({success:true,types});
    } catch (error) {
      console.error(error);
      res.status(500).json({ success:false,message: "Server error" });
    }
  };
  async readOne (req, res)  {
    try {
      const { id } = req.params;
      const type = await TypeModel.findById(id);
      if (!type) {
        return res.status(404).json({success:false, message: "Type not found" });
      }
      res.json({success:true,type});
    } catch (error) {
      console.error(error);
      res.status(500).json({success:false, message: "Server error" });
    }
  };
  async update  (req, res)  {
    try {
      const { id } = req.params;
      const { name, description } = req.body;
      const updatedType = await TypeModel.findByIdAndUpdate(
        id,
        { name, description },
        { new: true }
      );
      if (!updatedType) {
        return res.status(404).json({success:false, message: "Type not found" });
      }
      res.json({success:true,updatedType});
    } catch (error) {
      console.error(error);
      res.status(500).json({ success:false,message: "Server error" });
    }
  };
  async delete  (req, res)  {
    try {
      const { id } = req.params;
      const deletedType = await TypeModel.findByIdAndDelete(id);
      if (!deletedType) {
        return res.status(404).json({ success:false,message: "Type not found" });
      }
      res.json({success:true,deletedType});
    } catch (error) {
      console.error(error);
      res.status(500).json({ success:false,message: "Server error" });
    }
  };
}

export default TypeController;
