import multer from "multer";

const storage = multer.diskStorage({
  destination: "./public/products",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const limit = 1024 * 1024 * 2;

const fileFilter = (req, file, cb) => {
  if (file.mimetype.includes("jpeg") || file.mimetype.includes("png")) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const uploads = multer({
  storage: storage,
  limits: { fileSize: limit },
  fileFilter: fileFilter,
});

export default uploads;
