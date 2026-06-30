const express = require("express");
const uploadsController = require("../controllers/uploads.controller");
const router = express.Router();
const asyncHandler = require("../utils/asyncHandler")
const uploadLocal = require("../middlewares/multer");
const multer = require("multer");

router.post("/local", [uploadLocal.single('file')], asyncHandler(uploadsController.local));

router.post("/cloud", [multer().single("file")], asyncHandler(uploadsController.cloud));

module.exports = router;