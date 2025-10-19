import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ScanResult, Vulnerability } from "../types";
import {
  getSeverityColor,
  getSeverityBadgeColor,
} from "../utils/severityConfig";
import CodeViewer from "./CodeViewer";
import ChatBot from "./ChatBot";

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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-indigo-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading scan results...</p>
        </div>
      </div>
    );
  }

  const { summary, vulnerabilities } = scanResult;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">🛡️ Rune</h1>
              <p className="text-sm text-gray-600 mt-1">
                Scan: {scanResult.filename}
              </p>
            </div>
            <button
              onClick={handleNewScan}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              New Scan
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-2xl font-bold text-gray-900">
              {summary.total}
            </div>
            <div className="text-sm text-gray-600">Total Issues</div>
          </div>
          <div className="bg-red-50 p-4 rounded-lg shadow border-l-4 border-red-600">
            <div className="text-2xl font-bold text-red-900">
              {summary.critical}
            </div>
            <div className="text-sm text-red-700">Critical</div>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg shadow border-l-4 border-orange-600">
            <div className="text-2xl font-bold text-orange-900">
              {summary.high}
            </div>
            <div className="text-sm text-orange-700">High</div>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg shadow border-l-4 border-yellow-600">
            <div className="text-2xl font-bold text-yellow-900">
              {summary.medium}
            </div>
            <div className="text-sm text-yellow-700">Medium</div>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg shadow border-l-4 border-blue-600">
            <div className="text-2xl font-bold text-blue-900">
              {summary.low}
            </div>
            <div className="text-sm text-blue-700">Low</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow border-l-4 border-gray-600">
            <div className="text-2xl font-bold text-gray-900">
              {summary.info}
            </div>
            <div className="text-sm text-gray-700">Info</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Vulnerabilities List */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                Security Issues ({vulnerabilities.length})
              </h2>
              <button
                onClick={() => setShowChat(!showChat)}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-purple-700 transition-colors"
              >
                {showChat ? "Hide Chat" : "Ask AI"}
              </button>
            </div>

            {vulnerabilities.length === 0 ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="text-xl font-semibold text-green-900 mb-2">
                  No Issues Found!
                </h3>
                <p className="text-green-700">
                  Your code looks clean. Great job!
                </p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                {vulnerabilities.map((vuln, index) => (
                  <div
                    key={index}
                    className={`${getSeverityColor(
                      vuln.severity
                    )} border-l-4 rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow`}
                    onClick={() => setSelectedVuln(vuln)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={`${getSeverityBadgeColor(
                            vuln.severity
                          )} px-3 py-1 rounded-full text-xs font-bold uppercase`}
                        >
                          {vuln.severity}
                        </span>
                        <span className="font-semibold text-sm">
                          {vuln.issue_type}
                        </span>
                      </div>
                      {vuln.line_number && (
                        <span className="text-xs bg-white bg-opacity-50 px-2 py-1 rounded">
                          Line {vuln.line_number}
                        </span>
                      )}
                    </div>
                    <p className="text-sm mb-2">{vuln.description}</p>
                    <details className="text-sm">
                      <summary className="cursor-pointer font-semibold text-sm mb-1">
                        Fix Suggestion
                      </summary>
                      <p className="mt-2 pl-4 border-l-2 border-current border-opacity-30">
                        {vuln.fix_suggestion}
                      </p>
                    </details>
                  </div>
                ))}
              </div>
            )}

            {showChat && (
              <div className="mt-4">
                <ChatBot vulnerabilities={vulnerabilities} />
              </div>
            )}
          </div>

          {/* Code Viewer */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Code Review
            </h2>
            <CodeViewer
              code={scannedCode}
              highlightLine={selectedVuln?.line_number || null}
              filename={scanResult.filename}
            />
            {selectedVuln && selectedVuln.line_number && (
              <div className="mt-4 bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                <p className="text-sm text-indigo-900">
                  <strong>Selected Issue:</strong> {selectedVuln.issue_type} at
                  line {selectedVuln.line_number}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
