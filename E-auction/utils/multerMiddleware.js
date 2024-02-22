const multer = require("multer");

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

const multerMiddleware = function (req, res, next) {
  upload.single("avatar")(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      return next(err);
    } else if (err) {
      // An unknown error occurred when uploading.
      return next(err);
    }
    req.path = req?.file?.path;

    next();
  });
};

module.exports = multerMiddleware;
