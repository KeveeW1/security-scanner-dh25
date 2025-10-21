import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ScanResult, Vulnerability } from "../types";
import {
  getSeverityColor,
  getSeverityBadgeColor,
} from "../utils/severityConfig";
import CodeViewer from "./CodeViewer";
import ChatBot from "./ChatBot";
import Navigation from "./Navigation";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [scannedCode, setScannedCode] = useState<string>("");
  const [selectedVuln, setSelectedVuln] = useState<Vulnerability | null>(null);
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    // Retrieve scan result and code from sessionStorage
    const storedResult = sessionStorage.getItem("scanResult");
    const storedCode = sessionStorage.getItem("scannedCode");

    if (storedResult && storedCode) {
      setScanResult(JSON.parse(storedResult));
      setScannedCode(storedCode);
    } else {
      // If no scan data is available, redirect to upload page
      navigate("/upload");
    }
  }, [navigate]);

  const handleNewScan = () => {
    // Clear stored data and navigate to upload
    sessionStorage.removeItem("scanResult");
    sessionStorage.removeItem("scannedCode");
    navigate("/upload");
  };

  if (!scanResult) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-indigo-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-300">Loading scan results...</p>
        </div>
      </div>
    );
  }

  const { summary, vulnerabilities } = scanResult;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <Navigation />
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-slate-900/95 to-gray-900/95 backdrop-blur-md shadow-xl border-b border-gray-700/50 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center header-content">
            <div className="flex items-center space-x-4">
              <div>
                <h1 className="text-2xl font-bold text-white">
                  {scanResult.filename}
                </h1>
                <p className="text-sm text-gray-400 mt-1">Security Analysis</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowChat(!showChat)}
                className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:from-purple-700 hover:to-purple-800 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 flex items-center space-x-2"
              >
                <span>🤖</span>
                <span>{showChat ? "Close AI" : "Ask AI"}</span>
              </button>
              <button
                onClick={handleNewScan}
                className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-red-500/25 flex items-center space-x-2 header-buttons"
              >
                <span>⚡</span>
                <span>New Scan</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Enhanced Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8 stats-grid">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl shadow-lg border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300">
            <div className="text-3xl font-bold text-white mb-1">
              {summary.total}
            </div>
            <div className="text-sm text-gray-400 font-medium">
              Total Issues
            </div>
          </div>
          <div className="bg-gradient-to-br from-red-900/30 to-red-800/20 p-6 rounded-xl shadow-lg border border-red-500/30 hover:border-red-400/50 transition-all duration-300">
            <div className="text-3xl font-bold text-red-400 mb-1">
              {summary.critical}
            </div>
            <div className="text-sm text-red-300 font-medium">Critical</div>
          </div>
          <div className="bg-gradient-to-br from-orange-900/30 to-orange-800/20 p-6 rounded-xl shadow-lg border border-orange-500/30 hover:border-orange-400/50 transition-all duration-300">
            <div className="text-3xl font-bold text-orange-400 mb-1">
              {summary.high}
            </div>
            <div className="text-sm text-orange-300 font-medium">High</div>
          </div>
          <div className="bg-gradient-to-br from-yellow-900/30 to-yellow-800/20 p-6 rounded-xl shadow-lg border border-yellow-500/30 hover:border-yellow-400/50 transition-all duration-300">
            <div className="text-3xl font-bold text-yellow-400 mb-1">
              {summary.medium}
            </div>
            <div className="text-sm text-yellow-300 font-medium">Medium</div>
          </div>
          <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 p-6 rounded-xl shadow-lg border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300">
            <div className="text-3xl font-bold text-blue-400 mb-1">
              {summary.low}
            </div>
            <div className="text-sm text-blue-300 font-medium">Low</div>
          </div>
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl shadow-lg border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300">
            <div className="text-3xl font-bold text-gray-400 mb-1">
              {summary.info}
            </div>
            <div className="text-sm text-gray-500 font-medium">Info</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 dashboard-grid">
          {/* Enhanced Vulnerabilities List */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Security Issues ({vulnerabilities.length})
              </h2>
              <p className="text-gray-400 text-sm">
                Click on any issue to highlight it in the code
              </p>
            </div>

            {vulnerabilities.length === 0 ? (
              <div className="bg-gradient-to-br from-green-900/30 to-green-800/20 border border-green-500/30 rounded-xl p-8 text-center">
                <div className="text-6xl mb-4">✅</div>
                <h3 className="text-xl font-semibold text-green-400 mb-2">
                  No Issues Found!
                </h3>
                <p className="text-green-300">
                  Your code looks clean. Great job!
                </p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
                {vulnerabilities.map((vuln, index) => (
                  <div
                    key={index}
                    className={`${getSeverityColor(
                      vuln.severity
                    )} border-l-4 rounded-xl p-6 cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group vulnerability-card`}
                    onClick={() => setSelectedVuln(vuln)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span
                          className={`${getSeverityBadgeColor(
                            vuln.severity
                          )} px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide`}
                        >
                          {vuln.severity}
                        </span>
                        <span className="font-semibold text-white text-sm">
                          {vuln.issue_type}
                        </span>
                      </div>
                      {vuln.line_number && (
                        <span className="text-xs bg-gray-700/70 text-gray-100 px-3 py-1 rounded-full font-mono border border-gray-600/30">
                          Line {vuln.line_number}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-100 text-sm mb-4 leading-relaxed">
                      {vuln.description}
                    </p>
                    <details className="text-sm group">
                      <summary className="cursor-pointer font-semibold text-sm mb-2 text-gray-400 hover:text-white transition-colors">
                        💡 Fix Suggestion
                      </summary>
                      <div className="mt-3 pl-4 border-l-2 border-current border-opacity-30 bg-gray-800/30 rounded-r-lg p-3">
                        <p className="text-gray-100 text-sm leading-relaxed">
                          {vuln.fix_suggestion}
                        </p>
                      </div>
                    </details>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Enhanced Code Viewer */}
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Code Review
              </h2>
              <p className="text-gray-400 text-sm">
                Review your code with highlighted security issues
              </p>
            </div>
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-xl border border-gray-700/50 overflow-hidden">
              <CodeViewer
                code={scannedCode}
                highlightLine={selectedVuln?.line_number || null}
                filename={scanResult.filename}
              />
            </div>
            {selectedVuln && selectedVuln.line_number && (
              <div className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 border border-blue-500/30 rounded-xl p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-sm text-blue-300 font-semibold mb-1">
                      Selected Issue
                    </p>
                    <p className="text-sm text-gray-100">
                      <strong>{selectedVuln.issue_type}</strong> at line{" "}
                      {selectedVuln.line_number}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* AI Chatbot Sidebar */}
      <ChatBot
        vulnerabilities={vulnerabilities}
        isOpen={showChat}
        onClose={() => setShowChat(false)}
      />
    </div>
  );
};

export default Dashboard;
