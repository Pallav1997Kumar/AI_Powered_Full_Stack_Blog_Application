const express = require("express");
const { updateUserProfilePhoto, updateUserBasicInformation, updateUserEmailUsername, updateUserPassword } = require("../controllers/blogUserController");

const router = express.Router();


router.put("/update/profilePhoto/:userID", updateUserProfilePhoto);

router.put("/update/basicInfo/:userID", updateUserBasicInformation);

router.put("/update/usernameEmail/:userID", updateUserEmailUsername);

router.put("/update/password/:userID", updateUserPassword);


module.exports = router;