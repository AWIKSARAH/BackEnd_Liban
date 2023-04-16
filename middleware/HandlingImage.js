import multer from "multer";
import fs from "fs";

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    const destinationPath =  "./uploads"; // use a default value for destination
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
    if (req.file){
    upload.single(imageName)(req, res, function (err) {
      if (err) {
        console.error(err);
        return next(err);
      }
      // Check if a file has been uploaded
      if (req.file) {
        const destinationPath = "./uploads"; // use a default value for destination
        req.body.image = `${destinationPath}/${req.file.filename}`;
      }
    });}else{
      upload.none
    }
    next()
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
