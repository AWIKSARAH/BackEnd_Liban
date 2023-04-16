import multer from "multer";
import fs from "fs";
import { error } from "console";

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    const destinationPath = "./uploads";
    callback(null, destinationPath);
  },
  filename: function (req, file, callback) {
    callback(
      null,
      file.fieldname + "-" + Date.now() + "." + file.mimetype.split("/")[1]
    );
  },
});

const upload = multer({ storage });

export default function uploadImage(imageName) {
  return function (req, res, next) {
    // Use the `upload.none()` middleware for requests without an image file
     upload.single(imageName)(req, res, (err) => {
    if (err) {
      console.log(error)
    }
    if (req.file) {
      req.body.imagePath = req.file.path;
    }
    next();
  });
  };
}


export function deleteImage(imagePath) {
  fs.unlink(imagePath, (err) => {
    if (err) {
      console.error(`Error deleting image file: ${err}`);
    } else {
      console.log(`Image file ${imagePath} has been deleted`);
    }
  });
}
