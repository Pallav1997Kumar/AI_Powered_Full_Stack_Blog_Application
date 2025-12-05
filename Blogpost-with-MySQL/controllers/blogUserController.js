const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");


const db = require("../config/databaseConfig");

const { 
    UPDATE_BLOG_USERS_PROFILE_PHOTO, 
    CHECK_BLOG_USERS_BASIC_DETAILS_UNCHANGED,
    UPDATE_BLOG_USERS_BASIC_DETAILS,
    CHECK_USERNAME_EMAIL_ADDRESS_EXISTS,
    CHECK_USERNAME_EXISTS,
    CHECK_EMAIL_ADDRESS_EXISTS,
    CHECK_USERNAME_EMAIL_UNCHANGED,
    UPDATE_USERNAME_EMAIL,
    CHECK_USER_PASSWORD,
    UPDATE_USER_PASSWORD
} = require("../sqlQueries/blogUserQuery");

dotenv.config({path: "./config.env"});


const jwtPrivateKey = process.env.jwtPrivateKey;


//Updating profile picture path in database code starts
const updateUserProfilePhoto = async function(req, res, next){
    try {
        const token = req.body.token || req.cookies.jwt_access_token;
        const userID = req.params.userID;
        const imageDetail  = req.body.imageDetail;
        if(!token){
            return res.status(401).json("Not Authenticated");
        }
        // Verify JWT
        const userInformation = jwt.verify(token, jwtPrivateKey);

        if (userID != userInformation.id) {
            return res.status(403).json("Not Authorized");
        }

        await db.query(UPDATE_BLOG_USERS_PROFILE_PHOTO, [imageDetail.filename, userID]);

        return res.status(200).json("Your Profile Photo is updated successfully");
    }
    catch (error){
        console.log(error);
        return res.status(500).json("Internal Server Error");
    }
}
//Updating profile picture path in database code ends


//Updating basic information code starts
const updateUserBasicInformation = async function(req, res, next){
    try {
        const token = req.body.token || req.cookies.jwt_access_token;
        const firstName = req.body.firstName;
        const middleName = req.body.middleName;
        const lastName = req.body.lastName;
        const gender = req.body.gender;
        const dob = req.body.dob;
        const userID = req.params.userID;
        let fullName;
        if(middleName === "" || middleName === null ||middleName === undefined){
            fullName = firstName + " " + lastName;
        }else{
            fullName = firstName + " " + middleName + " " + lastName;
        }
        if(!token){
            return res.status(401).json("Not Authenticated");
        }
        // Verify JWT
        const userInformation = jwt.verify(token, jwtPrivateKey);

        if (userID != userInformation.id) {
            return res.status(403).json("Not Authorized");
        }

        // Check if user data is unchanged
        const existingUsersCheckInput = [userID, firstName, middleName, lastName, fullName, gender, dob];
        const existingUsersResult = await db.query(
            CHECK_BLOG_USERS_BASIC_DETAILS_UNCHANGED, existingUsersCheckInput);
        const existingUsers = existingUsersResult[0];

        if (existingUsers.length > 0) {
            return res.status(417).json("You have not updated any information");
        }

        // Update user information
        const updateUserBasicDetailsInput = [firstName, middleName, lastName, fullName, gender, dob, userID];
        await db.query(UPDATE_BLOG_USERS_BASIC_DETAILS, updateUserBasicDetailsInput);

        return res.status(200).json("Your Basic Information is updated successfully");
    }
    catch (error){
        console.log(error);
        return res.status(500).json("Internal Server Error");
    }
}
//Updating basic information code ends


//Updating username and email address code starts
const updateUserEmailUsername = async function(req, res, next){
    try {
        const token = req.body.token || req.cookies.jwt_access_token;
        const username = req.body.username;
        const email = req.body.email;
        const userID = req.params.userID;
        if(!token){
            return res.status(401).json("Not Authenticated");
        }
        // Verify JWT
        const userInformation = jwt.verify(token, jwtPrivateKey);

        if (userID != userInformation.id) {
            return res.status(403).json("Not Authorized");
        }

        const usernameEmailExistsResult = await db.query(CHECK_USERNAME_EMAIL_ADDRESS_EXISTS,[userID, username, email]);

        const usernameEmailRows = usernameEmailExistsResult[0];

        if (usernameEmailRows.length > 0){
            const usernameExistsResult = await db.query(CHECK_USERNAME_EXISTS,[userID, username]);
            const usernameRows = usernameExistsResult[0];

            if(usernameRows.length > 0){
                return res.status(409).json("Username already used. Please choose another username");
            }

            const emailExistsResult = await db.query(CHECK_EMAIL_ADDRESS_EXISTS,[userID, email]);

            const emailRows = emailExistsResult[0];

            if(emailRows.length > 0){
                return res.status(409).json("Email address already exist!");
            }
        }


        //Check if no changes were made
        const unchangedResult = await db.query(CHECK_USERNAME_EMAIL_UNCHANGED,[userID, username, email]);
        const unchangedRows = unchangedResult[0];

        if (unchangedRows.length > 0) {
            return res.status(417).json("You have not updated any information");
        }

        await db.query(UPDATE_USERNAME_EMAIL,[username, email, userID]);

        return res.status(200).json("Your Email Address and Username is updated successfully");
    }
    catch (error){
        console.log(error);
        return res.status(500).json("Internal Server Error");
    }
}
//Updating username and email address code ends


//Updating users password code starts
const updateUserPassword = async function(req, res, next){
    try {
        const token = req.body.token || req.cookies.jwt_access_token;
        const oldPassword = req.body.oldPassword;
        const newPassword = req.body.newPassword;;
        const confirmNewPassword = req.body.confirmNewPassword;
        const userID = req.params.userID;
        if(!token){
            return res.status(401).json("Not Authenticated");
        }
        // Verify JWT
        const userInformation = jwt.verify(token, jwtPrivateKey);

        if (userID != userInformation.id) {
            return res.status(403).json("Not Authorized");
        }

        const oldPasswordResult = await db.query(CHECK_USER_PASSWORD,[userID, oldPassword]);
        const oldPasswordRows = oldPasswordResult[0];

        if (oldPasswordRows.length === 0) {
            return res.status(401).json("You have entered wrong old password");
        }

        if (newPassword !== confirmNewPassword) {
            return res.status(401).json("New Password and Confirm New Password do not match!");
        }


        const samePasswordCheck = await db.query(CHECK_USER_PASSWORD,[userID, newPassword]);
        const samePasswordRows = samePasswordCheck[0];

        if (samePasswordRows.length > 0) {
            return res.status(401).json("New Password cannot be same as Old Password");
        }


        await db.query(UPDATE_USER_PASSWORD,[newPassword, userID]);

        return res.status(200).json("Password has been updated successfully");
    }
    catch (error){
        console.log(error);
        return res.status(500).json("Internal Server Error");
    }
}
//Updating users password code ends


module.exports = {
    updateUserProfilePhoto,
    updateUserBasicInformation,
    updateUserEmailUsername,
    updateUserPassword
};