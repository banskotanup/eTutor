const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../utils/cloudinary");

const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {
    return {
      folder: "lms_lessons",
      resource_type: "auto",   // <-- KEY FIX
      eager_async: true,
      public_id: "lesson_" + Date.now(),

      // Keep original format so MOV uploads properly
      format: file.originalname.split(".").pop(),
    };
  },
});

const upload = multer({ storage });
module.exports = upload;

// const upload = multer({ storage }).single("file");

// module.exports = (req, res, next) => {
//   upload(req, res, function (err) {
//     if (err) {
//       console.log("MULTER ERROR:", JSON.stringify(err, null, 2));
//       return res.status(500).json({ message: "Upload failed", error: err });
//     }
//     next();
//   });
// };