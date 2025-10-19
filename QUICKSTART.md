# CodeGuardian - Quick Start Guide

Get CodeGuardian running in 5 minutes!

## Step 1: Get Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click "Create API Key"
3. Copy your API key

## Step 2: Install Backend

```bash
cd backend
npm install
```

Create `.env` file in the backend folder:

```env
GEMINI_API_KEY=paste_your_key_here
PORT=3001
```

## Step 3: Install Frontend

```bash
cd ../frontend
npm install
```

## Step 4: Start the App

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

## Step 5: Test It!

1. Open browser to `http://localhost:3000`
2. Click "Start Security Scan"
3. Upload `sample-code/vulnerable-sql.js`
4. See the magic happen!

## What to Expect

The scanner will find:
- SQL injection vulnerabilities
- Hardcoded passwords
- Security misconfigurations
- And more!

## Common Issues

**"API Key not set" error?**
- Make sure `.env` file exists in `backend/` folder
- Check the API key is correct (no extra spaces)

**Frontend can't connect?**
- Make sure backend is running on port 3001
- Check `http://localhost:3001/health` shows "ok"

**Dependencies error?**
- Delete `node_modules` and run `npm install` again

## Need Help?

Check the full README.md for detailed documentation.

Enjoy scanning!
