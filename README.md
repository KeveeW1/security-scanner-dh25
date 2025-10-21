# RUNE

An AI-powered code security scanner that uses Google Gemini API to detect vulnerabilities, security flaws, and code quality issues in your codebase.

## Features

- **AI-Powered Analysis**: Leverages Google Gemini 1.5 Flash for intelligent security scanning
- **Comprehensive Security Checks**: Detects OWASP Top 10, SQL injection, XSS, hardcoded secrets, and more
- **Interactive Dashboard**: Clean UI with severity-based color coding (Critical, High, Medium, Low, Info)
- **Monaco Code Editor**: View your code with line-by-line highlighting of vulnerabilities
- **AI Chat Assistant**: Ask questions about detected vulnerabilities and get expert advice
- **Fix Suggestions**: Every issue comes with detailed fix recommendations
- **Multiple Input Methods**: Upload files or paste code directly

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for fast development
- Tailwind CSS for styling
- Monaco Editor for code viewing
- Axios for API calls

### Backend
- Node.js with Express
- Google Gemini API for AI analysis
- SQLite for data persistence
- Better-SQLite3 for database operations

## Prerequisites

- Node.js 18+ installed
- Google Gemini API key ([Get one here](https://makersuite.google.com/app/apikey))

## Installation

### 1. Clone and Setup

```bash
cd dh-25-pt2
```

### 2. Backend Setup

```bash
cd backend
npm install

# Create .env file
cp .env.example .env
```

Edit `backend/.env` and add your Gemini API key:

```env
GEMINI_API_KEY=your_actual_gemini_api_key_here
PORT=3001
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

## Running the Application

### Start Backend (Terminal 1)

```bash
cd backend
npm run dev
```

Backend will run on `http://localhost:3001`

### Start Frontend (Terminal 2)

```bash
cd frontend
npm run dev
```

Frontend will run on `http://localhost:3000`

## Usage

1. Open your browser to `http://localhost:3000`
2. Click "Start Security Scan"
3. Either:
   - Upload a code file (.js, .ts, .py, .java, .php, etc.)
   - Or paste code directly into the text area
4. Click "Analyze Code"
5. View results in the dashboard with:
   - Summary statistics by severity
   - Detailed vulnerability cards
   - Code viewer with line highlighting
   - AI chat for questions

## Testing with Sample Files

Three vulnerable code samples are provided in `/sample-code`:

1. **vulnerable-sql.js** - SQL injection and hardcoded credentials
2. **vulnerable-xss.html** - XSS vulnerabilities and unsafe DOM manipulation
3. **vulnerable-auth.py** - Authentication flaws, weak crypto, command injection

Try uploading these to see CodeGuardian in action!

## API Endpoints

- `POST /api/analyze` - Analyze code for vulnerabilities
- `GET /api/scans` - Get all scan history
- `GET /api/scans/:id` - Get specific scan details
- `POST /api/chat` - Chat with AI about vulnerabilities
- `GET /health` - Health check endpoint

## Project Structure

```
dh-25-pt2/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── LandingPage.tsx
│   │   │   ├── CodeUpload.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── CodeViewer.tsx
│   │   │   └── ChatBot.tsx
│   │   ├── services/
│   │   │   └── api.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   ├── utils/
│   │   │   └── severityConfig.ts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.ts
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── scanController.js
│   │   ├── services/
│   │   │   └── geminiService.js
│   │   ├── models/
│   │   │   └── database.js
│   │   ├── routes/
│   │   │   └── scanRoutes.js
│   │   └── index.js
│   ├── package.json
│   └── .env.example
├── sample-code/
│   ├── vulnerable-sql.js
│   ├── vulnerable-xss.html
│   └── vulnerable-auth.py
└── README.md
```

## Security Detection Capabilities

CodeGuardian can detect:

- **Injection Flaws**: SQL injection, Command injection, Code injection
- **Authentication Issues**: Weak passwords, hardcoded credentials, session management
- **Sensitive Data Exposure**: API keys, passwords, tokens in code
- **XSS**: Reflected, Stored, and DOM-based XSS
- **Broken Access Control**: Missing authentication, authorization bypasses
- **Security Misconfiguration**: Debug mode, default credentials
- **Cryptographic Issues**: Weak hashing algorithms, insecure random generation
- **Code Quality**: Performance issues, bad practices

## Severity Levels

- **Critical** (Red): Immediate security risk requiring urgent attention
- **High** (Orange): Serious security flaw that should be fixed soon
- **Medium** (Yellow): Moderate risk or code quality issue
- **Low** (Blue): Minor issue or suggestion
- **Info** (Gray): Informational notice or best practice

## Chat Feature

Click "Ask AI" in the dashboard to:
- Get detailed explanations of vulnerabilities
- Learn how to implement fixes
- Understand security best practices
- Ask questions about specific issues

Example questions:
- "How do I fix the SQL injection on line 15?"
- "What's the best way to hash passwords?"
- "Explain the XSS vulnerability you found"

## Limitations

- Code must be under 10MB
- Analysis time depends on code size (usually 5-15 seconds)
- Requires active internet connection for Gemini API
- Some complex vulnerabilities may require manual review

## Troubleshooting

### Backend won't start
- Verify your Gemini API key is set correctly in `.env`
- Check that port 3001 is not in use
- Run `npm install` again if dependencies are missing

### Frontend shows connection errors
- Ensure backend is running on port 3001
- Check browser console for CORS errors
- Verify API URL in `frontend/src/services/api.ts`

### No vulnerabilities detected
- Try the sample files to verify setup
- Check that code is valid and parseable
- Some clean code may genuinely have no issues

## Development

### Production Build

```bash
# Frontend
cd frontend
npm run build

# Backend (uses npm start)
cd backend
npm start
```

## License

MIT

## Contributing

Contributions welcome! Please open an issue or PR.

## Support

For issues or questions, please open a GitHub issue.

---

Built with Google Gemini AI
