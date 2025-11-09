const uploadBlogImageController = function (req, res) {
    res.status(200).json({
        message: "Blog image uploaded successfully!",
        file: req.file,
    });
}


const uploadProfilePhotoController = function (req, res) {
    res.status(200).json({
        message: "Profile photo uploaded successfully!",
        file: req.file,
    });
}


module.exports = {
    uploadBlogImageController,
    uploadProfilePhotoController
};