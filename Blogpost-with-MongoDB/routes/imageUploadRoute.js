const express = require("express");

const { 
    uploadBlogImage, 
    uploadProfilePhoto 
} = require("../config/multerConfig");

const {
    uploadBlogImageController,
    uploadProfilePhotoController,
} = require("../controllers/imageUploadController");

const router = express.Router();


router.post("/blogImage", uploadBlogImage.single("blogImage"), uploadBlogImageController);

router.post("/profilePhoto", uploadProfilePhoto.single("profilePhoto"), uploadProfilePhotoController);


module.exports = router;