// import Users from "../Models/Users.js";
// export const createUser = async (req, res) => {
//       const { name, email, password, IsAdmin } = req.body;
//        try {     const user = await Users.create({ name, email, password, IsAdmin });
//           res.status(201).json({       success: true,       data: {         user,       },     });
//          } catch (error) {     res.status(400).json({       success: false,       message: error.message,     });
//          } };
//          /**  * Function to read all users from the database  * @param {*} req   * @param {*} res   * @returns   */
//          export const getUsers = async (req, res) =>
//           {
//               try {

//                 const users = await Users.find({});
//                    if (!users) {
//  return res.status(404).json({success: false,error: 'No users found'});}res.status(200).json({success: true,         data: users       });     } catch (error) {       console.error(error);       res.status(500).json({         success: false,         error: 'Server error'       }

import model from '../models/Model_event.js'

// const add = async (req, res) => {
//     // const body = req.body;
//   try {
//     const event = model.create({'Title':'sarah'})
// // const event = new Model({'Title':'sarah'});
// // event.save((error, response) => {})
//    const data =  await event.save()
//    res.status(201).send({ success: true, data: req.body});
//   }
//   catch (err) {
//     res.send("error")
//   }
// }

function add(req, res, next) {
console.log(req.body);
    let Add = new model(req.body);
    Add
      .save()
      .then((response) => res.status(200).send({ success: true, response }))
      .catch((err) => {
        res.status(400).send(err);
      });
  }

const event = {add}
export default event
