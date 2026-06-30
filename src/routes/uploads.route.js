const express = require("express");
const uploadsController = require("../controllers/uploads.controller");
const router = express.Router();
const asyncHandler = require("../utils/asyncHandler")
const uploadLocal = require("../middlewares/multer");

router.post("/local", [uploadLocal.single('file')], asyncHandler(uploadsController.local));

router.post("/cloud", asyncHandler(uploadsController.cloud));

module.exports = router;