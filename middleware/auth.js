import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export default async function  requiredAuth  (req,res,next) {

    const {authorization} = req.headers


    if(!authorization){
        return res.status(401).json({success: false, error:'Authorization required'});
    }

    const token = authorization.split(' ')[1];

    try {
        const {_id}= jwt.verify(token, process.env.SECRET_KEY)
        console.log(_id);
        req.user = await User.findById(_id)
        console.log(req.user);
        next();
    } catch (error) {
    res.status(401).json({success: false, error: 'error'})
    }
}; 