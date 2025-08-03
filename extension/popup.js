// Backend API URL - Change this to your deployed backend
const API_BASE_URL = 'http://localhost:5000'; // Change this later

class TechListenApp {
    constructor() {
        this.currentArticleText = '';
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        document.getElementById('extract-btn').addEventListener('click', () => this.extractArticle());
        document.getElementById('summarize-btn').addEventListener('click', () => this.generateSummaryAndAudio());
        document.getElementById('try-again-btn').addEventListener('click', () => this.resetApp());
        document.getElementById('retry-btn').addEventListener('click', () => this.generateSummaryAndAudio());
    }

    async extractArticle() {
        try {
            this.showLoading('Extracting article content...');

            // Get current tab
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

            // Send message to content script
            const response = await chrome.tabs.sendMessage(tab.id, { action: "extractText" });

            if (response && response.success && response.text) {
                this.currentArticleText = response.text;
                this.showArticlePreview(response.text, response.title);
            } else {
                this.showError('Could not extract article content. Make sure you\'re on an article page.');
            }
        } catch (error) {
            console.error('Extraction error:', error);
            this.showError('Failed to extract article. Try refreshing the page.');
        }
    }

    async generateSummaryAndAudio() {
        if (!this.currentArticleText) {
            this.showError('No article text available');
            return;
        }

        try {
            this.showLoading('Generating summary and audio...');

            const response = await fetch(`${API_BASE_URL}/process-article`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text: this.currentArticleText
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            if (result.success) {
                this.showResult(result.summary, result.audio_url);
            } else {
                this.showError(result.error || 'Failed to process article');
            }
        } catch (error) {
            console.error('API error:', error);
            this.showError('Failed to connect to processing service. Check your internet connection.');
        }
    }

    showLoading(message) {
        this.hideAllSections();
        document.getElementById('loading').style.display = 'block';
        document.getElementById('loading-text').textContent = message;
    }

    showArticlePreview(text, title) {
        this.hideAllSections();
        document.getElementById('article-preview').style.display = 'block';

        const preview = text.substring(0, 200) + (text.length > 200 ? '...' : '');
        document.getElementById('preview-text').textContent = preview;
    }

    showResult(summary, audioUrl) {
        this.hideAllSections();
        document.getElementById('result').style.display = 'block';

        document.getElementById('summary-text').textContent = summary;

        const audioSource = document.getElementById('audio-source');
        const audioElement = document.getElementById('audio-element');

        audioSource.src = audioUrl;
        audioElement.load();
    }

    showError(message) {
        this.hideAllSections();
        document.getElementById('error').style.display = 'block';
        document.getElementById('error-text').textContent = message;
    }

    resetApp() {
        this.currentArticleText = '';
        this.hideAllSections();
        document.getElementById('main-content').style.display = 'block';
    }

    hideAllSections() {
        const sections = ['article-preview', 'loading', 'result', 'error'];
        sections.forEach(id => {
            document.getElementById(id).style.display = 'none';
        });
    }
}

// Initialize app when popup loads
document.addEventListener('DOMContentLoaded', () => {
    new TechListenApp();
});