import React from 'react';

interface LandingPageProps {
  onStartScan: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStartScan }) => {
  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center px-4">
      <div className="max-w-4xl text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-white mb-4">
            🛡️ CodeGuardian
          </h1>
          <p className="text-2xl text-indigo-100 mb-2">
            AI-Powered Security Scanner
          </p>
          <p className="text-lg text-indigo-200">
            Detect vulnerabilities, security flaws, and code quality issues with Google Gemini AI
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6 text-white">
            <div className="text-4xl mb-3">🔍</div>
            <h3 className="text-xl font-semibold mb-2">Deep Analysis</h3>
            <p className="text-indigo-100">
              Scans for OWASP Top 10, SQL injection, XSS, and more
            </p>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6 text-white">
            <div className="text-4xl mb-3">⚡</div>
            <h3 className="text-xl font-semibold mb-2">Instant Results</h3>
            <p className="text-indigo-100">
              Get security insights in seconds with AI-powered analysis
            </p>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6 text-white">
            <div className="text-4xl mb-3">💡</div>
            <h3 className="text-xl font-semibold mb-2">Smart Fixes</h3>
            <p className="text-indigo-100">
              Receive actionable fix suggestions for every issue
            </p>
          </div>
        </div>

        <button
          onClick={onStartScan}
          className="bg-white text-purple-700 px-12 py-4 rounded-lg text-xl font-bold hover:bg-indigo-50 transform hover:scale-105 transition-all duration-200 shadow-2xl"
        >
          Start Security Scan
        </button>

        <div className="mt-12 text-indigo-200 text-sm">
          <p>Powered by Google Gemini AI</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
