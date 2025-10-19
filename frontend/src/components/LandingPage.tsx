import React, { useState } from "react";
import { Link } from "react-router-dom";

const LandingPage: React.FC = () => {
  const [gameState, setGameState] = useState<
    "waiting" | "playing" | "completed"
  >("waiting");
  const [selectedSquares, setSelectedSquares] = useState<number[]>([]);
  const [bugSquares, setBugSquares] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [showHints, setShowHints] = useState(false);
  const [gameMessage, setGameMessage] = useState("");

  // Security analysis categories represented by each column
  const analysisCategories = [
    {
      name: "OWASP Top 10",
      color: "purple",
      description: "Critical web vulnerabilities",
      bugEmoji: "🕷️",
    },
    {
      name: "SQL Injection",
      color: "blue",
      description: "Database security flaws",
      bugEmoji: "💉",
    },
    {
      name: "XSS Protection",
      color: "green",
      description: "Cross-site scripting prevention",
      bugEmoji: "🔒",
    },
    {
      name: "Auth Security",
      color: "orange",
      description: "Authentication vulnerabilities",
      bugEmoji: "🔑",
    },
  ];

  // Initialize game with random bug locations
  const startGame = () => {
    const bugs: number[] = [];
    const totalSquares = 16;
    const numBugs = 4; // 4 bugs hidden in the grid

    // Randomly select bug locations
    while (bugs.length < numBugs) {
      const randomSquare = Math.floor(Math.random() * totalSquares);
      if (!bugs.includes(randomSquare)) {
        bugs.push(randomSquare);
      }
    }

    setBugSquares(bugs);
    setSelectedSquares([]);
    setScore(0);
    setAttempts(0);
    setGameState("playing");
    setGameMessage("Find the 4 security bugs! Click squares to scan them.");
  };

  const handleSquareClick = (index: number) => {
    if (gameState !== "playing" || selectedSquares.includes(index)) return;

    const newSelected = [...selectedSquares, index];
    setSelectedSquares(newSelected);
    setAttempts(attempts + 1);

    if (bugSquares.includes(index)) {
      setScore(score + 1);
      setGameMessage(`🐛 Bug found! ${score + 1}/4 bugs detected.`);

      if (score + 1 === bugSquares.length) {
        setTimeout(() => {
          setGameState("completed");
          setGameMessage(
            `🎉 All bugs found! You're ready to secure real code!`
          );
        }, 1000);
      }
    } else {
      setGameMessage(`✅ No bug here. Keep looking!`);
    }
  };

  const getSquareColor = (index: number) => {
    const column = index % 4;
    const baseColors = {
      0: "bg-purple-500",
      1: "bg-blue-500",
      2: "bg-green-500",
      3: "bg-orange-500",
    };

    if (selectedSquares.includes(index)) {
      if (bugSquares.includes(index)) {
        return "bg-red-500"; // Bug found - red
      } else {
        return "bg-gray-400"; // No bug - gray
      }
    }

    return baseColors[column as keyof typeof baseColors];
  };

  const getSquareContent = (index: number) => {
    if (!selectedSquares.includes(index)) return null;

    if (bugSquares.includes(index)) {
      return (
        <div className="flex items-center justify-center h-full">
          <span className="text-2xl">🐛</span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center justify-center h-full">
          <span className="text-2xl">✅</span>
        </div>
      );
    }
  };

  const getCategoryInfo = (index: number) => {
    const column = index % 4;
    return analysisCategories[column];
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Secure your code.
                <br />
                <span className="text-purple-400">Ship with confidence.</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Rune is a developer-first security platform that protects your
                code from vulnerabilities, security flaws, and malicious
                patterns using advanced AI analysis.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/upload"
                  className="bg-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center"
                >
                  <span className="mr-2">🚀</span>
                  Start Security Scan
                </Link>
              </div>
            </div>

            {/* Right Content - Bug Detection Mini-Game */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-3xl blur-3xl"></div>
              <div className="relative bg-gray-800 rounded-3xl p-8 border border-gray-700">
                {/* Game Header */}
                <div className="text-center mb-6">
                  <h3 className="text-white text-xl font-semibold mb-2">
                    🎮 Bug Detection Challenge
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Can you find all the security bugs?
                  </p>

                  {/* Game Stats */}
                  {gameState === "playing" && (
                    <div className="flex justify-center gap-4 text-sm">
                      <div className="bg-red-500/20 text-red-300 px-3 py-1 rounded-full">
                        Bugs: {score}/4
                      </div>
                      <div className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full">
                        Attempts: {attempts}
                      </div>
                    </div>
                  )}
                </div>

                {/* Game Grid */}
                <div className="grid grid-cols-4 gap-3 mb-6">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-12 rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg ${getSquareColor(
                        i
                      )} opacity-80 hover:opacity-100 border-2 border-transparent hover:border-white/30`}
                      onClick={() => handleSquareClick(i)}
                      title={
                        gameState === "playing"
                          ? `Scan square ${i + 1}`
                          : getCategoryInfo(i).description
                      }
                    >
                      {getSquareContent(i)}
                    </div>
                  ))}
                </div>

                {/* Game Message */}
                {gameMessage && (
                  <div className="text-center mb-4">
                    <p className="text-white text-sm font-medium">
                      {gameMessage}
                    </p>
                  </div>
                )}

                {/* Game Controls */}
                <div className="text-center">
                  {gameState === "waiting" && (
                    <button
                      onClick={startGame}
                      className="bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                    >
                      🎯 Start Bug Hunt
                    </button>
                  )}

                  {gameState === "playing" && (
                    <div className="space-y-2">
                      <button
                        onClick={() => setShowHints(!showHints)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors mr-2"
                      >
                        {showHints ? "Hide" : "Show"} Hints
                      </button>
                      <button
                        onClick={startGame}
                        className="bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-700 transition-colors"
                      >
                        🔄 Restart
                      </button>
                    </div>
                  )}

                  {gameState === "completed" && (
                    <div className="space-y-3">
                      <div className="text-green-400 font-semibold">
                        🏆 Challenge Complete!
                      </div>
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={startGame}
                          className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-purple-700 transition-colors"
                        >
                          🔄 Play Again
                        </button>
                        <Link
                          to="/upload"
                          className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors"
                        >
                          🚀 Scan Real Code
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                {/* Hints */}
                {showHints && gameState === "playing" && (
                  <div className="mt-4 p-3 bg-blue-900/30 rounded-lg">
                    <p className="text-blue-300 text-xs text-center">
                      💡 Hint: Bugs are hidden in different security categories.
                      Look for patterns in OWASP, SQL Injection, XSS, and Auth
                      vulnerabilities!
                    </p>
                  </div>
                )}

                {/* Legend */}
                <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                  {analysisCategories.map((category, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div
                        className={`w-3 h-3 rounded ${getSquareColor(
                          index
                        ).replace("bg-", "bg-")}`}
                      ></div>
                      <span className="text-gray-300">{category.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Why Choose Rune?
            </h2>
            <p className="text-xl text-gray-300">
              Advanced security analysis powered by AI
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {analysisCategories.map((category, index) => (
              <div
                key={index}
                className="bg-gray-900 rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition-colors"
              >
                <div
                  className={`w-12 h-12 ${getSquareColor(
                    index
                  )} rounded-lg flex items-center justify-center mb-4`}
                >
                  <span className="text-white text-xl">
                    {index === 0
                      ? "🛡️"
                      : index === 1
                      ? "💉"
                      : index === 2
                      ? "🔒"
                      : "🔑"}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  {category.name}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {category.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
