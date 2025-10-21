import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navigation: React.FC = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-6xl px-4 sm:px-6 lg:px-8">
      <nav className="bg-gray-800/95 backdrop-blur-md border border-gray-700 rounded-full shadow-xl">
        <div className="flex justify-between items-center h-14 px-6">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img
                src="/images/tsconfig.node.png"
                alt="RUNE Logo"
                className="w-7 h-7 mr-2"
              />
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
              className="p-2 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          {/* CTA Button */}
          <div className="flex items-center">
            <Link
              to="/upload"
              className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-full font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-lg hover:shadow-red-500/25 flex items-center space-x-2"
            >
              <span>⚡</span>
              <span>Start Attack</span>
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 p-4 bg-gray-800/95 backdrop-blur-md border border-gray-700 rounded-xl shadow-xl">
            <div className="space-y-2">
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
  );
};

export default Navigation;
