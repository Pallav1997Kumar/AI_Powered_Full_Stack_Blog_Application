const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinaryConfig");
const multer = require("multer");
const path = require('path');


// Blog Image Storage Configuration
const blogImageStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "uploads/blogImages", // Cloudinary folder name
        allowed_formats: ["jpg", "png", "jpeg", "webp"],
        public_id: function (req, file) {
            const userID = req.query.userID;
            const baseName = path.parse(file.originalname).name;
            return Date.now() + "-" + userID + "-" + baseName;
        },
    },
});


// Profile Photo Storage Configuration
const profilePhotoStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "uploads/profilePhotos",
        allowed_formats: ["jpg", "png", "jpeg", "webp"],
        public_id: function (req, file) {
            const userID = req.query.userID;
            const baseName = path.parse(file.originalname).name;
            return Date.now() + "-" + userID + "-" + baseName;
        },
    },
});


// Multer uploaders for blog images and profile photos
const uploadBlogImage = multer({ storage: blogImageStorage });
const uploadProfilePhoto = multer({ storage: profilePhotoStorage });

module.exports = {
    uploadBlogImage,
    uploadProfilePhoto
};