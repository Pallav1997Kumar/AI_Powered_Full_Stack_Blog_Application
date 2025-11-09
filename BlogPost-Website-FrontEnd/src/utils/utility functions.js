export function getPlainText(htmlText) {
    const doc = new DOMParser().parseFromString(htmlText, "text/html");
    return doc.body.textContent;
}