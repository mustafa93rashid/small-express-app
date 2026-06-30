const UploadToCloudinary = require("../utils/uploadToCloudinary");
class UploadController {
    local = async (req, res) => {
        const file = req.file;
        if (!file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const filePath = file.path; // Path where the file is stored

        res.status(200).json({ message: "File uploaded successfully", filePath , file });

    }

    cloud = async (req, res) => {
        const file = req.file;
        if (!file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const path = await UploadToCloudinary(file);

        res.status(200).json({ message: "File uploaded successfully", path });

    } 
}

module.exports = new UploadController();