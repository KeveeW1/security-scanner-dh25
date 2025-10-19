import React from "react";
import { Link, useLocation } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Top Banner */}
      <div className="bg-purple-900 text-white text-center py-2 text-sm">
        <span>
          🚀 Introducing Rune AI: Free, Proactive Protection for Your Code
          Security.{" "}
        </span>
        <a href="#" className="underline hover:text-purple-200">
          Learn More →
        </a>
      </div>

      {/* Navigation */}
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center">
                <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-lg">🛡️</span>
                </div>
                <span className="text-white text-xl font-semibold">Rune</span>
              </Link>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <Link
                  to="/"
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    location.pathname === "/"
                      ? "text-white"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  Home
                </Link>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium"
                >
                  Product
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium"
                >
                  Learn
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium"
                >
                  Company
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium"
                >
                  Pricing
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium"
                >
                  Docs
                </a>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex items-center space-x-4">
              <Link
                to="/upload"
                className="bg-white text-gray-900 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors flex items-center"
              >
                <span className="mr-2">🚀</span>
                Start Scan
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer - only show on landing page */}
      {location.pathname === "/" && (
        <footer className="bg-gray-900 border-t border-gray-700 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-lg">🛡️</span>
                </div>
                <span className="text-white text-xl font-semibold">Rune</span>
              </div>
              <p className="text-gray-400">Powered by Google Gemini AI</p>
            </div>

            <div className="border-t border-gray-700 pt-8">
              <div className="text-center text-gray-400 text-sm">
                <p>Trusted by developers worldwide for secure code analysis</p>
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default Layout;
