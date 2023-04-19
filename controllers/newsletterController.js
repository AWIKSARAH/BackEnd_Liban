import model from '../models/newsletterModel.js';
const create = async (req,res) => {
    const body = req.body.email;
   try {
    const data = await model.create(body);
res.status(200).json({success: true, data:data});
   } catch (error) {
res.status(500).json({success: false, error:error.body});
    
   }
};
const get = async (req, res) => {
    try {
        const data = await model.find({});
        res.status(200).json({success: true, data:data});
    } catch (error) {
        res.status(500).json({success: false, error:error.body});
        
    }
};
const news ={create, get};
export default news;
