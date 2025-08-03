// Content script to extract article text
function extractArticleText() {
    // Method 1: Try common article selectors
    const articleSelectors = [
        'article',
        '[role="main"]',
        '.post-content',
        '.article-body',
        '.entry-content',
        '.content',
        '.post-body',
        '.article-content'
    ];

    for (let selector of articleSelectors) {
        const element = document.querySelector(selector);
        if (element) {
            const text = element.innerText || element.textContent;
            if (text && text.length > 500) {
                return cleanText(text);
            }
        }
    }

    // Method 2: Find the largest text block
    const allElements = document.querySelectorAll('p, div');
    let largestText = '';
    let largestLength = 0;

    allElements.forEach(element => {
        const text = element.innerText || element.textContent;
        if (text && text.length > largestLength && text.length > 300) {
            largestText = text;
            largestLength = text.length;
        }
    });

    return largestText ? cleanText(largestText) : null;
}

function cleanText(text) {
    // Remove extra whitespace and clean up
    return text
        .replace(/\s+/g, ' ')
        .replace(/\n+/g, ' ')
        .replace(/\t+/g, ' ')
        .trim()
        .substring(0, 5000); // Limit to 5000 chars
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "extractText") {
        const articleText = extractArticleText();
        const pageTitle = document.title;
        const pageUrl = window.location.href;

        sendResponse({
            text: articleText,
            title: pageTitle,
            url: pageUrl,
            success: !!articleText
        });
    }
});