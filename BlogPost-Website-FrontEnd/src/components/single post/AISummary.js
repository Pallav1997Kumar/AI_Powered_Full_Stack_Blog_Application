import { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

import "../../style/single post/AISummary.scss";

import backendBaseURL from "../../backendBaseURL.js";
import { getPlainText } from "../../utils/utility functions.js";


function AISummary(props){
    const postDescription = props.postDescription;

    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    async function handleGenerateAISummary() {
        setError(null);
        setLoading(true);
        const values = {
            blogText: getPlainText(postDescription)
        }
        try {
            const response = await axios.post(
                `${backendBaseURL}/api/generativeAI/summarizeBlogDescription`,
                values
            );
            setSummary(response.data.blogSummary);

        } 
        catch (error) {
            console.log(error);
            setError("Failed to generate summary. Please try again");
        }
        finally{
            setLoading(false);
        }
    }


    return (
        <div className="ai-summary-section">
            <h4>AI Generated Summary</h4>
            <Button
                variant="info"
                disabled={loading}
                onClick={handleGenerateAISummary}
            >
                {loading ? <Spinner animation="border" size="sm" /> : "Generate Summary"}
            </Button>

            {error && <p className="error-message">{error}</p>}

            {summary &&
                <div className="summaries">
                    <p>{summary}</p>
                </div>
            }
        </div>
    );
}


export default AISummary;