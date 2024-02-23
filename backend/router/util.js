const multer = require("multer");
const router = require("express").Router();

// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads"); // Define the destination directory for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Keep the original filename
  },
});

const upload = multer({ storage: storage });

// Endpoint to handle file upload
router.post("/uploadfile", upload.single("myfile"), (req, res, next) => {
  try {
    if (!req.file) {
      // If no file is uploaded, throw an error
      throw new Error("No file uploaded");
    }
    res.status(200).json({ status: "success" });
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
});

module.exports = router;
