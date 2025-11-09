const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const BlogUser = require("../database-models/blogUser");

dotenv.config({path: "./config.env"});


const jwtPrivateKey = process.env.jwtPrivateKey;


//Updating profile picture path in database code starts
const updateUserProfilePhoto = function(req, res, next){
    const token = req.body.token || req.cookies.jwt_access_token;
    const userID = req.params.userID;
    const imageDetail  = req.body.imageDetail;
    if(!token){
        return res.status(401).json("Not Authenticated");
    }
    jwt.verify(token, jwtPrivateKey, function(error, userInformation){
        if(userID != userInformation.id){
            return res.status(403).json("Not Authenticated");
        }
        const updateInfo = {
            userProfilePhoto: imageDetail.file.path
        };
        BlogUser.findByIdAndUpdate(userID, { $set: updateInfo })
        .then((result) => {
            return res.status(200).json("Your Profile Photo is updated successfully");
        }).catch((err) => {
            console.log(err);
        });
    });
}
//Updating profile picture path in database code ends


//Updating basic information code starts
const updateUserBasicInformation = function(req, res, next){
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
    jwt.verify(token, jwtPrivateKey, function(error, userInformation){
        if(userID != userInformation.id){
            return res.status(403).json("Not Authenticated");
        }
        BlogUser.findOne({ $and: [
            { _id: userID }, 
            { firstName: firstName }, 
            { middleName: middleName },
            { lastName: lastName },
            { fullName: fullName },
            { gender: gender },
            { dateOfBirth: dob }
        ] })
        .then((user) => {
            if(user){
                return res.status(417).json("You have not updated any information");
            }
            else{
                const updateInfo = {
                    firstName: firstName,
                    middleName: middleName,
                    lastName: lastName,
                    fullName, fullName,
                    gender: gender,
                    dateOfBirth: dob
                };
                BlogUser.findByIdAndUpdate(userID, { $set: updateInfo })
                .then((result) => {
                    return res.status(200).json("Your Basic Information is updated successfully");
                }).catch((err) => {
                    console.log(err);
                });
            }
        }).catch((err) => {
            
        });
    });
}
//Updating basic information code ends


//Updating username and email address code starts
const updateUserEmailUsername = function(req, res, next){
    const token = req.body.token || req.cookies.jwt_access_token;
    const username = req.body.username;
    const email = req.body.email;
    const userID = req.params.userID;
    if(!token){
        return res.status(401).json("Not Authenticated");
    }
    jwt.verify(token, jwtPrivateKey, function(error, userInformation){
        if(userID != userInformation.id){
            return res.status(403).json("Not Authenticated");
        }
        BlogUser.findOne({
            $and: [
                { _id: {$not: { $eq: userID}} },
                { $or: [ {username: username} , {emailAddress: email}]}
            ]
        })
        .then((result1) => {
            if(result1){
                BlogUser.findOne({
                    $and: [
                        { _id: {$not: { $eq: userID}} },
                        { username: username }
                    ]
                })
                .then((result2) => {
                    if(result2){
                        return res.status(409).json("Username already used. Please choose another username");
                    }
                    else{
                        BlogUser.findOne({
                            $and: [
                                { _id: {$not: { $eq: userID}} },
                                { emailAddress: email }
                            ]
                        })
                        .then((result3) => {
                            return res.status(409).json("Email address already exist!");
                        }).catch((err) => {
                            console.log(err);
                        });
                    }
                }).catch((err) => {
                    console.log(err);
                });
            }
            else{
                BlogUser.findOne({
                    $and: [
                        { _id: userID },
                        { emailAddress: email },
                        { username: username }
                    ]
                })
                .then((result4) => {
                    if (result4) {
                        return res.status(417).json("You have not updated any information");
                    }
                    else{
                        const updateInfo = {
                            emailAddress: email,
                            username: username
                        };
                        BlogUser.findByIdAndUpdate(userID, { $set: updateInfo })
                        .then((result) => {
                            return res.status(200).json("Your Email Address and Username is updated successfully");
                        }).catch((err) => {
                            console.log(err);
                        });
                    }
                }).catch((err) => {
                    console.log(err);
                });
            }
        }).catch((err) => {
            console.log(err);
        });
    });
}
//Updating username and email address code ends


//Updating users password code starts
const updateUserPassword = function(req, res, next){
    const token = req.body.token || req.cookies.jwt_access_token;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;;
    const confirmNewPassword = req.body.confirmNewPassword;
    const userID = req.params.userID;
    if(!token){
        return res.status(401).json("Not Authenticated");
    }
    jwt.verify(token, jwtPrivateKey, function(error, userInformation){
        if(userID != userInformation.id){
            return res.status(403).json("Not Authenticated");
        }
        BlogUser.findOne({
            $and: [
                { _id: userID },
                { password: oldPassword }
            ]
        })
        .then((result) => {
            if(result){
                if(newPassword === confirmNewPassword){
                    BlogUser.findOne({
                        $and: [
                            { _id: userID },
                            { password: newPassword }
                        ]
                    })
                    .then((result2) => {
                        if(result2){
                            return res.status(401).json("New Password cannot be same as Old Password");
                        }
                        else{
                            const updateInfo = {
                                password: newPassword
                            };
                            BlogUser.findByIdAndUpdate(userID, { $set: updateInfo})
                            .then((result3) => {
                                return res.status(200).json("Password has been updated successfully");
                            }).catch((err) => {
                                console.log(err);
                            });
                        }
                    }).catch((err) => {
                        console.log(err);
                    });
                }
                else{
                    return res.status(401).json("New Password and Confirm New Password does not match!");
                }
            }
            else{
                return res.status(401).json("You have entered wrong old password");
            }
        }).catch((err) => {
            console.log(err);
        });
    });
}
//Updating users password code ends


module.exports = {
    updateUserProfilePhoto,
    updateUserBasicInformation,
    updateUserEmailUsername,
    updateUserPassword
};