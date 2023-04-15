// import multer from "multer";
// import fs from "fs";

// const storage = multer.diskStorage({
//   destination: function (req, file, callback) {
//     callback(null, file.destination);
//   },
//   filename: function (req, file, callback) {
//     callback(
//       null,
//       file.fieldname + "-" + Date.now() + "." + file.mimetype.split("/")[1]
//     );
//   },
// });

// const upload = multer({ storage });

// export default function uploadImage(imageName, destination) {
//   return function (req, res, next) {
//     upload.single(imageName)(req, res, function (err) {
//       if (err) {
//         return next(err);
//       }
//       req.imagePath = `${destination}/${req.file.filename}`;
//       next();
//     });
//   };
// }

// export function deleteImage(imagePath) {
//   fs.unlink(imagePath, (err) => {
//     if (err) {
//       console.error(`Error deleting image file: ${err}`);
//     } else {
//       console.log(`Image file ${imagePath} has been deleted`);
//     }
//   });
// }

