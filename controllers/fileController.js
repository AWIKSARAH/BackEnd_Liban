import File from "../models/filesModel.js";

class FileController {

    async post(req, res, next){
        try{const image=req.body.image;
        let response = await File.create({image})
        res.status(200).json(response)
        }catch(error){
            next(error)
        }
        
    }
}
const fileController = new FileController()
export default fileController