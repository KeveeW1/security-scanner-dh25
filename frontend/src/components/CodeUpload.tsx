import React, { useState } from 'react';
import { analyzeCode } from '../services/api';
import { ScanResult } from '../types';

interface CodeUploadProps {
  onScanComplete: (result: ScanResult, code: string) => void;
  onBack: () => void;
}

const CodeUpload: React.FC<CodeUploadProps> = ({ onScanComplete, onBack }) => {
  const [code, setCode] = useState('');
  const [filename, setFilename] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFilename(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        setCode(text);
      };
      reader.readAsText(file);
    }
  };

  const handleSubmit = async () => {
    if (!code.trim()) {
      setError('Please provide code to analyze');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const result = await analyzeCode(code, filename || 'code.txt');
      onScanComplete(result, code);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to analyze code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="mb-6 text-indigo-600 hover:text-indigo-800 flex items-center gap-2"
        >
          ← Back to Home
        </button>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Upload Code for Analysis
          </h2>

          <div className="space-y-6">
            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload File
              </label>
              <input
                type="file"
                onChange={handleFileUpload}
                accept=".js,.ts,.jsx,.tsx,.py,.java,.php,.rb,.go,.cpp,.c,.cs,.html,.css"
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-lg file:border-0
                  file:text-sm file:font-semibold
                  file:bg-indigo-50 file:text-indigo-700
                  hover:file:bg-indigo-100 cursor-pointer"
              />
            </div>

            <div className="text-center text-gray-500">OR</div>

            {/* Manual Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Paste Code
              </label>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Paste your code here..."
                rows={15}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono text-sm"
              />
            </div>

            {/* Filename Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filename (optional)
              </label>
              <input
                type="text"
                value={filename}
                onChange={(e) => setFilename(e.target.value)}
                placeholder="e.g., app.js"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={isLoading || !code.trim()}
              className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Analyzing with AI...
                </span>
              ) : (
                'Analyze Code'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeUpload;
