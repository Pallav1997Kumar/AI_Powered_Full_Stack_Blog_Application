const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { v4: uuidv4 } = require("uuid");


const db = require("../config/databaseConfig");

const { 
    EXISTING_USERNAME_OR_EMAIL_ADDRESS_CHECK, 
    EXISTING_USERNAME_CHECK,
    EXISTING_EMAIL_ADDRESS_CHECK,
    INSERT_NEW_BLOG_USERS,
    GET_USERS_BY_EMAIL_ADDRESS,
    GET_USERS_BY_EMAIL_ADDRESS_AND_PASSWORD,
    DELETE_BLOG_USER_BY_ID
} = require("../sqlQueries/authorizationQuery");

const { DELETE_ALL_BLOG_POSTS_BY_USER_ID } = require("../sqlQueries/blogPostQuery");
const { DELETE_ALL_BLOG_COMMENT_BY_USER_ID } = require("../sqlQueries/blogPostCommentQuery");
const { DELETE_BLOG_LIKE_BY_USER_ID } = require("../sqlQueries/blogPostLikeQuery");


dotenv.config({path: "./config.env"});


const jwtPrivateKey = process.env.jwtPrivateKey;


//User Registration code starts
const blogUserRegistration = async function(req, res, next){
    try {
        const firstName = req.body.firstName;
        const middleName = req.body.middleName;
        const lastName = req.body.lastName;
        const username = req.body.username;
        const gender = req.body.gender;
        const dob = req.body.dob;
        const email = req.body.email;
        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword;
        let fullName;
        if(middleName === "" || middleName === null ||middleName === undefined){
            fullName = firstName + " " + lastName;
        }else{
            fullName = firstName + " " + middleName + " " + lastName;
        }
        let profilePhoto;
        if(gender === "Male"){
            profilePhoto = "https://res.cloudinary.com/dgxqqp4rn/image/upload/v1761490143/uploads/profilePhotos/Male.png";
        }
        else if(gender === "Female"){
            profilePhoto = "https://res.cloudinary.com/dgxqqp4rn/image/upload/v1761490344/uploads/profilePhotos/Female.jpg"
        }

        // Check if username OR email already exists
        const existingUsersResult = await db.query(
            EXISTING_USERNAME_OR_EMAIL_ADDRESS_CHECK,
            [username, email]
        );

        const existingUsers = existingUsersResult[0];

        if(existingUsers.length > 0){
            const usernameCheck = await db.query(
                EXISTING_USERNAME_CHECK,
                [username]
            );
            if (usernameCheck[0].length > 0) {
                return res.status(409).json("Username already used. Please choose another username");
            }

            const emailCheck = await db.query(
                EXISTING_EMAIL_ADDRESS_CHECK,
                [email]
            );
            if (emailCheck[0].length > 0) {
                return res.status(409).json("Email address already exists!");
            }
        }

        if (password !== confirmPassword) {
            return res.status(401).json("Password and Confirm Password does not match!");
        }

        const userId = uuidv4();

        await db.query(
            INSERT_NEW_BLOG_USERS,
            [userId, firstName, middleName, lastName, fullName, username, email, gender, password, dob, profilePhoto]
        );

        return res.status(200).json("User has been created successfully");
    }
    catch (error){
        console.error(error);
        return res.status(500).json("Internal server error");
    }
}
//User Registration code ends


//User Login code starts
const blogUserLogin = async function(req, res, next){
    try {
        const email = req.body.email;
        const loginPassword = req.body.password;

        // Query for user by email
        const matchingEmailResult = await db.query(
            GET_USERS_BY_EMAIL_ADDRESS,
            [email]
        );

        const matchingEmailUsers = matchingEmailResult[0]; 

        if (matchingEmailUsers.length === 0) {
            return res.status(401).json("Incorrect Email Address");
        }

        const matchEmailPasswordResult = await db.query(
            GET_USERS_BY_EMAIL_ADDRESS_AND_PASSWORD,
            [email, loginPassword]
        );

        const matchEmailPasswordUser = matchEmailPasswordResult[0];

        if(matchEmailPasswordUser.length === 0){
            return res.status(401).json("Incorrect Password");
        }

        const user = matchEmailPasswordUser[0];

        // Generate JWT
        const token = jwt.sign({ id: user._id }, jwtPrivateKey, { expiresIn: "1d" });
        res.cookie("jwt_access_token", token, { httpOnly: true });

        const publicData = {
            firstName: user.firstName,
            middleName: user.middleName,
            lastName: user.lastName,
            fullName: user.fullName,
            userID: user._id,
            username: user.username,
            emailAddress: user.emailAddress,
            gender: user.gender,
            dob: user.dateOfBirth,
            profilePhoto: user.userProfilePhoto, 
            jwtToken: token
        };
        return res.status(200).json(publicData);
    }
    catch (error){
        console.error(error);
        return res.status(500).json("Internal server error");
    }
}
//User Login code ends


//Delete Account code starts
const blogUserAccountDelete = async function(req, res, next){
    try {
        const token = req.body.token || req.cookies.jwt_access_token;
        const userID = req.params.userID;
        if(!token){
            return res.status(401).json("Not Authenticated");
        }

        const userInformation = jwt.verify(token, jwtPrivateKey);
        if(userID != userInformation.id){
            return res.status(401).json("Not Authenticated");   
        }

        await db.query(DELETE_ALL_BLOG_POSTS_BY_USER_ID,[userID]);
        await db.query(DELETE_ALL_BLOG_COMMENT_BY_USER_ID, [userID]);
        await db.query(DELETE_BLOG_LIKE_BY_USER_ID, [userID]);

        await db.query(DELETE_BLOG_USER_BY_ID,[userID]);

        res.clearCookie("jwt_access_token");
        return res.status(200).json("Your account is deleted successfully.");
    }
    catch (error){
        console.error(error);
        return res.status(500).json("Internal server error");
    }
}
//Delete Account code ends


//User Logout code starts
const blogUserLogout = function(req, res, next){
    res.clearCookie("jwt_access_token");
    return res.status(200).json("User has been logout successfully");
}
//User Logout code ends


module.exports = {
    blogUserRegistration,
    blogUserLogin,
    blogUserAccountDelete,
    blogUserLogout
};