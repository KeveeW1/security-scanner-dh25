#!/bin/bash

echo "🛡️  Setting up CodeGuardian..."
echo ""

# Backend setup
echo "📦 Installing backend dependencies..."
cd backend
npm install

if [ ! -f .env ]; then
    echo "📝 Creating .env file from example..."
    cp .env.example .env
    echo "⚠️  IMPORTANT: Edit backend/.env and add your GEMINI_API_KEY!"
fi

cd ..

# Frontend setup
echo "📦 Installing frontend dependencies..."
cd frontend
npm install

cd ..

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Get your Gemini API key from: https://makersuite.google.com/app/apikey"
echo "2. Add it to backend/.env file"
echo "3. Start backend: cd backend && npm run dev"
echo "4. Start frontend (in new terminal): cd frontend && npm run dev"
echo "5. Open http://localhost:3000"
echo ""
echo "Happy scanning! 🔍"
