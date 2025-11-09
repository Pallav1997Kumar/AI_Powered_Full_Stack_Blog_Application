function extractBlogTitles(text) {
    const lines = text.split('\n');

    // Keep only lines that start with a number and a dot
    const titleLines = lines.filter(line => /^\d+\.\s+/.test(line));

    // Clean up each line
    const blogTitles = titleLines.map(line => {
        let title = line.replace(/^\d+\.\s+/, '');   // remove number
        title = title.replace(/\*\*/g, '');         // remove bold **
        title = title.replace(/\s*\(.*\)$/, '');    // remove trailing parentheses
        return title.trim();
    });

    return blogTitles;
}

module.exports = {
    extractBlogTitles
}
