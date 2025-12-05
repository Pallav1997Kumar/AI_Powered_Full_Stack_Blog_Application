const dotenv = require("dotenv");
const axios = require("axios");

const { generateAccessToken } = require("../googleAuthToken.js");
const { extractBlogTitles } = require("../utils/functions.js");

dotenv.config({ path: "./config.env" });

const GEMINI_MODEL_NAME = "gemini-2.5-flash-lite";


const getBlogDescriptionSummary = async function(req, res, next){
    const blogText = req.body.blogText;

    if (!blogText) {
        return res.status(400).json({ errorMessage: "Blog description is required" });
    }

    try {
            
        // Get OAuth access token
        const accessToken = await generateAccessToken();

        const geminiResponse = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL_NAME}:generateContent`,
            {
                contents: [
                    {
                        parts: [
                            { 
                                text: `Summarize the following blog description into a concise, engaging, and SEO-friendly paragraph that highlights the main ideas and key takeaways, while preserving the original intent:\n\n"${blogText}"\n\nSummary:`
                            }
                        ]
                    }
                ],
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 15000
                }
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                }
            }
        );

        const geminiResponseData = geminiResponse.data;

        // First candidate from the API response
        const firstCandidateFromResponse = geminiResponseData.candidates[0];
        // The content block inside the first candidate
        const contentBlockOfFirstCandidate = firstCandidateFromResponse.content;
        // The parts array inside the content block
        const partsOfFirstContentBlock = contentBlockOfFirstCandidate.parts;
        // The first part of the content block
        const firstPartOfContentBlock = partsOfFirstContentBlock[0];
        // The generated text from the first part
        const generatedText = firstPartOfContentBlock.text;

        const plainTextSummary = generatedText.replace(/\*|_|#/g, "").trim();

        const aiGeneratedSummary = plainTextSummary;

        return res.status(200).json({ blogSummary: aiGeneratedSummary });
    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({ errorMessage: "Internal Server Error" });
    }
}


const suggestBlogTitlesFromBlogDescription = async function(req, res){
    const blogText = req.body.blogText;

    if (!blogText) {
        return res.status(400).json({ errorMessage: "Blog description is required" });
    }

    try {

        // Get OAuth access token
        const accessToken = await generateAccessToken();

        const geminiResponse = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL_NAME}:generateContent`,
            {
                contents: [
                    {
                        parts: [
                            { 
                                text: `Suggest 5 catchy blog titles for the following description:\n\n${blogText}` 
                            }
                        ]
                    }
                ],
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 150
                }
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                }
            }
        );

        const geminiResponseData = geminiResponse.data;

        // First candidate from the API response
        const firstCandidateFromResponse = geminiResponseData.candidates[0];
        // The content block inside the first candidate
        const contentBlockOfFirstCandidate = firstCandidateFromResponse.content;
        // The parts array inside the content block
        const partsOfFirstContentBlock = contentBlockOfFirstCandidate.parts;
        // The first part of the content block
        const firstPartOfContentBlock = partsOfFirstContentBlock[0];
        // The generated text from the first part
        const generatedText = firstPartOfContentBlock.text;
        
        const geminiGeneratedBlogTitles = extractBlogTitles(generatedText);

        return res.status(200).json({ geminiGeneratedBlogTitles: geminiGeneratedBlogTitles });

    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({ errorMessage: "Internal Server Error" });
    }
}


const suggestBlogDescriptionsFromBlogTitle = async function(req, res){
    const blogTitle = req.body.blogTitle;

    if (!blogTitle) {
        return res.status(400).json({ errorMessage: "Blog description is required" });
    }

    try {

        // Get OAuth access token
        const accessToken = await generateAccessToken();

        const geminiResponse = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL_NAME}:generateContent`,
            {
                contents: [
                    {
                        parts: [
                            { 
                                text: `Write a detailed blog description (around 2500 characters) for the following blog title:\n\n"${blogTitle}"\n\nDescription:` 
                            }
                        ]
                    }
                ],
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 15000
                }
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                }
            }
        );

        const geminiResponseData = geminiResponse.data;

        // First candidate from the API response
        const firstCandidateFromResponse = geminiResponseData.candidates[0];
        // The content block inside the first candidate
        const contentBlockOfFirstCandidate = firstCandidateFromResponse.content;
        // The parts array inside the content block
        const partsOfFirstContentBlock = contentBlockOfFirstCandidate.parts;
        // The first part of the content block
        const firstPartOfContentBlock = partsOfFirstContentBlock[0];
        // The generated text from the first part
        const generatedText = firstPartOfContentBlock.text;
        
        const geminiGeneratedBlogDescription = generatedText;

        return res.status(200).json({ geminiGeneratedBlogDescription: geminiGeneratedBlogDescription });

    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({ errorMessage: "Internal Server Error" });
    }
}


const enhanceBlogDescription = async function (req, res) {
    const blogText = req.body.blogText;

    if (!blogText) {
        return res.status(400).json({ errorMessage: "Blog description is required" });
    }

    try {
        
        // Get OAuth access token
        const accessToken = await generateAccessToken();

        const geminiResponse = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL_NAME}:generateContent`,
            {
                contents: [
                    {
                        parts: [
                            { 
                                text: `Enhance and improve the following blog description to make it more engaging, professional, and SEO-friendly, while preserving the original meaning:\n\n"${blogText}"\n\nEnhanced Description:`
                            }
                        ]
                    }
                ],
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 15000
                }
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                }
            }
        );

        const geminiResponseData = geminiResponse.data;

        // First candidate from the API response
        const firstCandidateFromResponse = geminiResponseData.candidates[0];
        // The content block inside the first candidate
        const contentBlockOfFirstCandidate = firstCandidateFromResponse.content;
        // The parts array inside the content block
        const partsOfFirstContentBlock = contentBlockOfFirstCandidate.parts;
        // The first part of the content block
        const firstPartOfContentBlock = partsOfFirstContentBlock[0];
        // The generated text from the first part
        const generatedText = firstPartOfContentBlock.text;

        const enhancedBlogDescription = generatedText;

        return res.status(200).json({ enhancedBlogDescription: enhancedBlogDescription });
    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({ errorMessage: "Internal Server Error" });
    }
}



module.exports = {
    getBlogDescriptionSummary,
    suggestBlogTitlesFromBlogDescription,
    suggestBlogDescriptionsFromBlogTitle,
    enhanceBlogDescription
};