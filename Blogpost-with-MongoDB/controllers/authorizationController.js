const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const BlogUser = require("../database-models/blogUser");

dotenv.config({path: "./config.env"});


const jwtPrivateKey = process.env.jwtPrivateKey;


//User Registration code starts
const blogUserRegistration = function(req, res, next){
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

    BlogUser.findOne({ $or: [{ emailAddress: email }, { username: username }] })
    .then((user) => {
        if(user){
            BlogUser.findOne({ username: username })
            .then((user) => {
                if(user){
                    return res.status(409).json("Username already used. Please choose another username");
                }
                else{
                    BlogUser.findOne({ emailAddress: email })
                    .then((user) => {
                        if(user){
                            return res.status(409).json("Email address already exist!");
                        }
                    }).catch((err) => {
                        console.log(err);
                    });
                }
            }).catch((err) => {
                console.log(err);
            });
        }
        else{
            if(password === confirmPassword){
                const newUser = new BlogUser({
                    firstName,
                    middleName,
                    lastName,
                    fullName,
                    username,
                    emailAddress: email,
                    gender,
                    dateOfBirth: dob,
                    password,
                    userProfilePhoto: profilePhoto
                });
                newUser.save()
                .then((result) => {
                    return res.status(200).json("User has been created successfully");
                }).catch((err) => {
                    console.log(err);
                });
            }
            else{
                return res.status(401).json("Password and Confirm Password does not match!");
            }
            
        }
    }).catch((err) => {
        console.log(err);
    });
}
//User Registration code ends


//User Login code starts
const blogUserLogin = function(req, res, next){
    const email = req.body.email;
    const loginPassword = req.body.password;
    BlogUser.findOne({ emailAddress: email })
    .then((user) => {
        if(user){
            BlogUser.findOne({ $and: [{ emailAddress: email }, { password: loginPassword }] })
            .then((user) => {
                if(user){
                    const token = jwt.sign({id: user._id}, jwtPrivateKey);
                    res.cookie("jwt_access_token", token, {httpOnly: true});
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
                else{
                    return res.status(401).json("Incorrect Password");
                }
            }).catch((err) => {
                console.log(err);
            });
        }
        else{
            return res.status(401).json("Incorrect Email Address");
        }
    }).catch((err) => {
        console.log(err);
    });
}
//User Login code ends


//Delete Account code starts
const blogUserAccountDelete = function(req, res, next){
    const token = req.body.token || req.cookies.jwt_access_token;
    const userID = req.params.userID;
    if(!token){
        return res.status(401).json("Not Authenticated");
    }
    jwt.verify(token, jwtPrivateKey, function(error, userInformation){
        if(userID != userInformation.id){
            return res.status(401).json("Not Authenticated");   
        }
        BlogUser.findByIdAndDelete(userID)
        .then((result) => {
            BlogPost.deleteMany( {userID: userID} );
            BlogPostComment.deleteMany( {userID: userID} );
            BlogPostLike.deleteMany( {userID: userID} );
            res.clearCookie("jwt_access_token");
            return res.status(200).json("Your account is deleted successfully.");
        }).catch((err) => {
            console.log(err);
        });
    });
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