import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { analyzeCode } from "../services/api";

const CodeUpload: React.FC = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [filename, setFilename] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [dragActive, setDragActive] = useState(false);

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

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
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
      setError("Please provide code to analyze");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const result = await analyzeCode(code, filename || "code.txt");
      // Store the result and code in sessionStorage for the dashboard to access
      sessionStorage.setItem("scanResult", JSON.stringify(result));
      sessionStorage.setItem("scannedCode", code);
      navigate("/dashboard");
    } catch (err: any) {
      setError(
        err.response?.data?.error || "Failed to analyze code. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center text-sm text-slate-600 hover:text-slate-900 transition-colors mb-6"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Home
          </button>

          <h1 className="text-3xl font-semibold text-slate-900 mb-2">
            Code Security Analysis
          </h1>
          <p className="text-slate-600">
            Upload your code for comprehensive security vulnerability detection
          </p>
        </div>

        {/* Main Upload Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-8">
            {/* File Upload Section */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Upload File
              </label>
              <div
                className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive
                    ? "border-blue-400 bg-blue-50"
                    : "border-slate-300 hover:border-slate-400"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <div className="space-y-4">
                  <div className="mx-auto w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-slate-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">
                      Drag and drop your code file here, or
                    </p>
                    <label className="inline-flex items-center px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-colors cursor-pointer">
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                      Choose File
                      <input
                        type="file"
                        onChange={handleFileUpload}
                        accept=".js,.ts,.jsx,.tsx,.py,.java,.php,.rb,.go,.cpp,.c,.cs,.html,.css"
                        className="hidden"
                      />
                    </label>
                  </div>
                  <p className="text-xs text-slate-500">
                    Supports JavaScript, TypeScript, Python, Java, PHP, Ruby,
                    Go, C++, C#, HTML, CSS
                  </p>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="relative mb-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-slate-500 font-medium">
                  OR
                </span>
              </div>
            </div>

            {/* Code Input Section */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  Paste Code Directly
                </label>
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="// Paste your code here for analysis..."
                  rows={12}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm bg-slate-50 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  Filename
                  <span className="text-slate-500 font-normal ml-1">
                    (optional)
                  </span>
                </label>
                <input
                  type="text"
                  value={filename}
                  onChange={(e) => setFilename(e.target.value)}
                  placeholder="e.g., auth.js, api.py, index.html"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex">
                  <svg
                    className="w-5 h-5 text-red-400 mr-3 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div>
                    <h3 className="text-sm font-medium text-red-800">
                      Analysis Failed
                    </h3>
                    <p className="text-sm text-red-700 mt-1">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="mt-8 pt-6 border-t border-slate-200">
              <button
                onClick={handleSubmit}
                disabled={isLoading || !code.trim()}
                className="w-full bg-slate-900 text-white py-3 px-6 rounded-lg font-medium hover:bg-slate-800 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Analyzing Code...
                  </>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Analyze Code
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Security Features */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h3 className="font-medium text-slate-900 mb-1">
              Enterprise Security
            </h3>
            <p className="text-sm text-slate-600">
              OWASP Top 10 compliance and industry standards
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="font-medium text-slate-900 mb-1">
              AI-Powered Analysis
            </h3>
            <p className="text-sm text-slate-600">
              Advanced machine learning for vulnerability detection
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <svg
                className="w-6 h-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="font-medium text-slate-900 mb-1">Instant Results</h3>
            <p className="text-sm text-slate-600">
              Get detailed reports in seconds, not hours
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeUpload;
