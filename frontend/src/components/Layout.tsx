import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black">
      {/* Floating Navigation */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <nav className="bg-gray-800/90 backdrop-blur-md border border-gray-700 rounded-full shadow-xl">
          <div className="flex justify-between items-center h-14 px-6">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center">
                <div className="w-7 h-7 bg-red-500 rounded-lg flex items-center justify-center mr-2">
                  <span className="text-white font-bold text-sm">Y</span>
                </div>
                <span className="text-white text-lg font-semibold">RUNE</span>
              </Link>
            </div>

            {/* Navigation Links - Desktop */}
            <div className="hidden lg:flex items-center space-x-1">
              <Link
                to="/"
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                  location.pathname === "/"
                    ? "bg-red-500/20 text-white"
                    : "text-gray-300 hover:text-white hover:bg-gray-700/50"
                }`}
              >
                Home
              </Link>
              <a
                href="#"
                className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-full transition-all duration-200"
              >
                Product
              </a>
              <a
                href="#"
                className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-full transition-all duration-200"
              >
                Learn
              </a>
              <a
                href="#"
                className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-full transition-all duration-200"
              >
                Company
              </a>
              <a
                href="#"
                className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-full transition-all duration-200"
              >
                Pricing
              </a>
              <a
                href="#"
                className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-full transition-all duration-200"
              >
                Docs
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-300 hover:text-white p-2 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>

            {/* CTA Button */}
            <div className="flex items-center">
              <Link
                to="/upload"
                className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-red-600 transition-all duration-200 flex items-center shadow-lg hover:shadow-red-500/25"
              >
                <span className="mr-2">⚡</span>
                <span className="hidden sm:inline">Start Attack</span>
                <span className="sm:hidden">Start</span>
              </Link>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden border-t border-gray-700">
              <div className="px-6 py-4 space-y-2">
                <Link
                  to="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    location.pathname === "/"
                      ? "bg-red-500/20 text-white"
                      : "text-gray-300 hover:text-white hover:bg-gray-700/50"
                  }`}
                >
                  Home
                </Link>
                <a
                  href="#"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-lg transition-colors"
                >
                  Product
                </a>
                <a
                  href="#"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-lg transition-colors"
                >
                  Learn
                </a>
                <a
                  href="#"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-lg transition-colors"
                >
                  Company
                </a>
                <a
                  href="#"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-lg transition-colors"
                >
                  Pricing
                </a>
                <a
                  href="#"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-lg transition-colors"
                >
                  Docs
                </a>
              </div>
            </div>
          )}
        </nav>
      </div>

      {/* Main Content */}
      <main className="pt-24 bg-black">{children}</main>

      {/* Footer - only show on landing page */}
      {location.pathname === "/" && (
        <footer className="bg-black border-t border-gray-700 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-lg">Y</span>
                </div>
                <span className="text-white text-xl font-semibold">RUNE</span>
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
