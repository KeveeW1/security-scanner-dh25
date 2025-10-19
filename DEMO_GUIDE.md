# CodeGuardian - Demo Guide

This guide will help you demo CodeGuardian's capabilities.

## Prerequisites Checklist

- [ ] Node.js 18+ installed
- [ ] Gemini API key obtained from https://makersuite.google.com/app/apikey
- [ ] Dependencies installed (`npm install` in both frontend and backend)
- [ ] API key added to `backend/.env`

## Starting the Application

### Terminal 1 - Backend
```bash
cd backend
npm run dev
```

You should see:
```
CodeGuardian backend running on port 3001
Health check: http://localhost:3001/health
```

### Terminal 2 - Frontend
```bash
cd frontend
npm run dev
```

You should see:
```
VITE v5.x.x ready in xxx ms
➜  Local:   http://localhost:3000/
```

## Demo Flow

### 1. Landing Page
- Open http://localhost:3000
- Beautiful gradient background
- Three feature cards
- "Start Security Scan" button

**Talking Points:**
- AI-powered security scanner
- Uses Google Gemini for intelligent analysis
- Detects OWASP Top 10 vulnerabilities

### 2. Code Upload Page
- Click "Start Security Scan"
- Shows two input methods:
  - File upload
  - Paste code directly

**Demo Option A: Upload File**
```bash
# Upload: sample-code/vulnerable-sql.js
```

**Demo Option B: Paste Code**
Copy and paste from `sample-code/vulnerable-sql.js`

**Talking Points:**
- Supports multiple file types
- Clean, intuitive interface
- Real-time analysis with AI

### 3. Analysis (Loading State)
- Shows loading spinner
- "Analyzing with AI..." message
- Takes 5-15 seconds

**Talking Points:**
- Gemini processes the code
- Checking for security vulnerabilities
- Analyzing code quality

### 4. Dashboard - Results
After analysis completes, you'll see:

**A. Summary Statistics**
Six cards showing:
- Total Issues
- Critical (Red)
- High (Orange)
- Medium (Yellow)
- Low (Blue)
- Info (Gray)

**For vulnerable-sql.js, expect to find:**
- SQL Injection vulnerabilities (Critical/High)
- Hardcoded credentials (Critical)
- Insecure password storage (High)
- Missing input validation (Medium)

**B. Vulnerability Cards (Left Side)**
Each card shows:
- Severity badge
- Issue type
- Description
- Line number
- Fix suggestion (expandable)

**Talking Points:**
- Click any card to highlight code
- Expandable fix suggestions
- Severity-based color coding

**C. Code Viewer (Right Side)**
- Monaco Editor (same as VS Code)
- Syntax highlighting
- Selected line highlighted in red
- Line numbers

**Talking Points:**
- Professional code editor
- Click vulnerability to jump to line
- Easy to locate issues

### 5. AI Chat Feature
- Click "Ask AI" button
- Chat interface appears

**Demo Questions to Ask:**
1. "How do I fix the SQL injection on line 15?"
2. "What's the best way to store passwords securely?"
3. "Explain why hardcoded credentials are dangerous"

**Talking Points:**
- Interactive AI assistant
- Get detailed explanations
- Learn best practices
- Context-aware answers

### 6. Try Different Files

**Sample 1: vulnerable-sql.js**
- SQL injection
- Hardcoded credentials
- Session management issues

**Sample 2: vulnerable-xss.html**
- XSS vulnerabilities
- eval() usage
- Unsafe DOM manipulation

**Sample 3: vulnerable-auth.py**
- Weak password hashing (MD5)
- Command injection
- Path traversal
- Missing authentication

## Key Features to Highlight

### 1. Comprehensive Security Analysis
- OWASP Top 10 coverage
- SQL Injection detection
- XSS vulnerabilities
- Authentication issues
- Hardcoded secrets
- Cryptographic flaws

### 2. AI-Powered Intelligence
- Google Gemini 1.5 Flash
- Natural language explanations
- Context-aware suggestions
- Best practice recommendations

### 3. Developer-Friendly UI
- Clean, modern interface
- Tailwind CSS styling
- Responsive design
- Professional code editor

### 4. Actionable Results
- Line-by-line detection
- Severity classification
- Fix suggestions
- Interactive chat

### 5. Multiple Input Methods
- File upload
- Direct paste
- Multiple language support

## Expected Results by File

### vulnerable-sql.js
```
Expected Issues: 6-8
- SQL Injection (lines 17, 31)
- Hardcoded password (line 8)
- Insecure session storage
- Exposed API key
```

### vulnerable-xss.html
```
Expected Issues: 5-7
- XSS via innerHTML (lines 16, 30)
- eval() usage (dangerous!)
- localStorage exposure
- Unsafe DOM manipulation
```

### vulnerable-auth.py
```
Expected Issues: 8-10
- MD5 password hashing
- Hardcoded credentials
- Command injection
- Path traversal
- Missing authentication
- Debug mode in production
```

## Troubleshooting During Demo

### Backend Won't Start
```bash
# Check if .env exists and has API key
cat backend/.env

# Test API key
curl http://localhost:3001/health
```

### Frontend Connection Error
```bash
# Verify backend is running
curl http://localhost:3001/health

# Check browser console
# Look for CORS errors
```

### No Vulnerabilities Found
- Verify you're using sample files
- Check backend logs for errors
- Ensure API key is valid

### Slow Analysis
- Normal for first request (cold start)
- Large files take longer
- Gemini API rate limits may apply

## Demo Script (2 minutes)

**[0:00-0:20] Introduction**
"CodeGuardian is an AI-powered security scanner that uses Google Gemini to detect vulnerabilities in your code. Let me show you how it works."

**[0:20-0:40] Upload**
"You can upload a file or paste code directly. I'll use this sample file with intentional vulnerabilities."

**[0:40-1:00] Analysis**
"The AI is analyzing the code for security issues, checking for OWASP Top 10 vulnerabilities, SQL injection, XSS, and more."

**[1:00-1:30] Results**
"Here we see 8 issues found - 2 critical, 3 high severity. Each issue shows the exact line number, description, and how to fix it. Notice the SQL injection on line 15 and the hardcoded password on line 8."

**[1:30-1:50] Code Viewer**
"Click any issue to highlight it in the code editor. This makes it easy to see exactly where the problem is."

**[1:50-2:00] Chat**
"You can also ask the AI questions about the vulnerabilities to learn how to fix them properly."

## Tips for Best Demo

1. **Prepare in advance**: Have backend and frontend running before demo
2. **Use sample files**: They're designed to show various vulnerabilities
3. **Show the flow**: Landing → Upload → Results → Chat
4. **Highlight severity**: Point out the color coding
5. **Interactive**: Click vulnerabilities, ask AI questions
6. **Explain value**: Saves time, teaches security, prevents bugs

## What Makes This Demo-Ready

✅ Professional UI with gradient backgrounds
✅ Smooth user flow
✅ Fast analysis (5-15 seconds)
✅ Clear, actionable results
✅ Interactive features (click, chat)
✅ Real AI integration (not mocked)
✅ Multiple test cases
✅ Error handling
✅ Responsive design
✅ Production-quality code

## Questions to Anticipate

**Q: How accurate is it?**
A: Uses Google's latest Gemini model, trained on vast codebases. Very accurate for common vulnerabilities.

**Q: What languages does it support?**
A: JavaScript, TypeScript, Python, Java, PHP, Ruby, Go, C++, and more.

**Q: Can it handle large codebases?**
A: Currently optimized for individual files up to 10MB. Can be extended for multi-file analysis.

**Q: How much does it cost?**
A: Uses Gemini API which has a free tier. Cost depends on usage.

**Q: Can it integrate with CI/CD?**
A: Absolutely! The API can be integrated into any pipeline.

Good luck with your demo!
