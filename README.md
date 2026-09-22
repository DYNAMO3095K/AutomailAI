Automail - AI-Powered Email Assistant
Automail is a full-stack web application designed to streamline professional communication by integrating artificial intelligence with standard email workflows. Developed as a final-year Bachelor of Computer Applications (BCA) project, this tool utilizes the Gemini 2.5 Flash model to draft context-aware emails and securely dispatches them, along with file attachments, directly through the user's Gmail account using the native REST API.

Core Features:

- Zero-Trust Authentication: Secure login via Google Identity Services (OAuth 2.0). The system operates on short-lived client-side access tokens and never stores user passwords.

- Agentic AI Drafting: Contextual email generation and conversational refinement using the Gemini 2.5 Flash API.

- Seamless Attachments: Client-side Base64 file encoding utilizing the native browser FileReader API for secure data transmission.

- Direct Dispatch: Automated construction of multipart/mixed MIME payloads dispatched directly to the Gmail REST API.


Tech Stack:

- Frontend: HTML5, Vanilla JavaScript, Tailwind CSS

- Backend: Node.js, Express.js

- APIs & Integrations: Google AI SDK (Gemini 2.5 Flash), Google OAuth 2.0, Gmail REST API


Prerequisites

To run this project locally, you will need:

- Node.js installed on your machine.

- A Google Cloud Console account with the Gmail API enabled and an OAuth 2.0 Client ID.

- A Google AI Studio account for the Gemini API key.


Local Setup & Installation

1. Clone the repository:

git clone https://github.com/DYNAMO3095K/AutomailAI.git
cd AutomailAI


2. Configure Environment Variables:

Create a file named .env in the root directory. Add your specific API keys to match the required variables:

GEMINI_API_KEY=your_gemini_api_key_here
PORT=3000


3. Start the server:

npm start

Access the application by navigating to http://localhost:3000 in your web browser.


Repository Notes & Excluded Files

For security and version control best practices, several local development and private files have been intentionally excluded from this public repository via .gitignore:

- .env: Contains sensitive API keys and backend configuration data.

- node_modules/: The local dependency tree (rebuild this using npm install).

- Report/ & Documentation: Academic PDFs and Word documents related to the project viva and technical reports.

- Raw Assets: General screenshots and image dumps have been excluded, aside from the specific workflow diagrams required for this documentation.
