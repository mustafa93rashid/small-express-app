require("dotenv").config();

const fs = require("fs");
const path = require("path");
const { v2: cloudinary } = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY_CLOUD,
  api_secret: process.env.API_SECRET_CLOUD,
});

const uploadToCloudinary = async (file) => {
  let filePath;

  try {
    const tempDir = path.join(__dirname, "tmp");

    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    filePath = path.join(tempDir, file.originalname);

    fs.writeFileSync(filePath, file.buffer);

    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });

    return result.secure_url;
  } finally {
    if (filePath && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
};

module.exports = uploadToCloudinary;