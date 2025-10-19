import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SlidingNumber } from "@/components/animate-ui/primitives/texts/sliding-number";
import { StarsBackground } from "@/components/animate-ui/components/backgrounds/stars";

const LandingPage: React.FC = () => {
  const [gameState, setGameState] = useState<
    "waiting" | "playing" | "completed"
  >("waiting");
  const [selectedSquares, setSelectedSquares] = useState<number[]>([]);
  const [vulnerabilitySquares, setVulnerabilitySquares] = useState<number[]>(
    []
  );
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [showHints, setShowHints] = useState(false);
  const [gameMessage, setGameMessage] = useState(
    "Click 'Start Red Team' to begin the challenge!"
  );
  const [isLoaded, setIsLoaded] = useState(false);

  // Page load animation
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // AI vulnerability categories represented by each column
  const vulnerabilityCategories = [
    {
      name: "Prompt Injection",
      color: "red",
      description: "Malicious prompt manipulation",
      emoji: "💉",
    },
    {
      name: "Jailbreak",
      color: "orange",
      description: "Bypassing AI safety measures",
      emoji: "🔓",
    },
    {
      name: "System Extraction",
      color: "yellow",
      description: "Extracting system prompts",
      emoji: "📋",
    },
    {
      name: "PII Leakage",
      color: "purple",
      description: "Personal data exposure",
      emoji: "🔍",
    },
  ];

  // Initialize game with random vulnerability locations
  const startGame = () => {
    console.log("Starting game...");
    const vulnerabilities: number[] = [];
    const totalSquares = 16;
    const numVulnerabilities = 4; // 4 vulnerabilities hidden in the grid

    // Randomly select vulnerability locations
    while (vulnerabilities.length < numVulnerabilities) {
      const randomSquare = Math.floor(Math.random() * totalSquares);
      if (!vulnerabilities.includes(randomSquare)) {
        vulnerabilities.push(randomSquare);
      }
    }

    console.log("Vulnerabilities at squares:", vulnerabilities);
    setVulnerabilitySquares(vulnerabilities);
    setSelectedSquares([]);
    setScore(0);
    setAttempts(0);
    setGameState("playing");
    setGameMessage(
      "Find the 4 AI vulnerabilities! Click squares to defuse the bombs."
    );
  };

  const handleSquareClick = (index: number) => {
    if (gameState !== "playing" || selectedSquares.includes(index)) return;

    const newSelected = [...selectedSquares, index];
    setSelectedSquares(newSelected);
    setAttempts(attempts + 1);

    if (vulnerabilitySquares.includes(index)) {
      setScore(score + 1);
      setGameMessage(`💣 Bomb defused! ${score + 1}/4 vulnerabilities found.`);

      if (score + 1 === vulnerabilitySquares.length) {
        setTimeout(() => {
          setGameState("completed");
          setGameMessage(
            `🎉 All bombs defused! Your AI is secure from attacks!`
          );
        }, 1000);
      }
    } else {
      setGameMessage(`✅ No bomb here. Keep searching!`);
    }
  };

  const getSquareColor = (index: number) => {
    const column = index % 4;
    const baseColors = {
      0: "bg-red-500",
      1: "bg-orange-500",
      2: "bg-yellow-500",
      3: "bg-purple-500",
    };

    if (selectedSquares.includes(index)) {
      if (vulnerabilitySquares.includes(index)) {
        // Vulnerability found - make the original color darker but keep the category color
        const originalColor = baseColors[column as keyof typeof baseColors];
        return originalColor.replace("500", "700"); // Make it darker but keep the color
      } else {
        // Keep original color but make it slightly darker to show it's been checked
        const originalColor = baseColors[column as keyof typeof baseColors];
        return originalColor.replace("500", "600"); // Make it darker but keep the color
      }
    } else {
      // For unselected squares
      if (gameState === "completed" && vulnerabilitySquares.includes(index)) {
        // If game is completed and this square has a vulnerability, show it with proper color
        const originalColor = baseColors[column as keyof typeof baseColors];
        return originalColor.replace("500", "700"); // Make it darker to show it's a vulnerability
      } else {
        // Normal unselected squares
        return baseColors[column as keyof typeof baseColors];
      }
    }
  };

  const getSquareContent = (index: number) => {
    if (selectedSquares.includes(index)) {
      if (vulnerabilitySquares.includes(index)) {
        return (
          <div className="flex items-center justify-center h-full">
            <span className="text-2xl">💣</span>
          </div>
        );
      } else {
        return (
          <div className="flex items-center justify-center h-full">
            <span className="text-2xl">✅</span>
          </div>
        );
      }
    } else {
      // Show content for unselected squares
      if (gameState === "completed" && vulnerabilitySquares.includes(index)) {
        // If game is completed and this square has a vulnerability, show bomb
        return (
          <div className="flex items-center justify-center h-full">
            <span className="text-2xl">💣</span>
          </div>
        );
      } else {
        // Show initial content for unselected squares
        const category = getCategoryInfo(index);
        return (
          <div className="flex items-center justify-center h-full">
            <span className="text-2xl opacity-60">{category.emoji}</span>
          </div>
        );
      }
    }
  };

  const getCategoryInfo = (index: number) => {
    const column = index % 4;
    return vulnerabilityCategories[column];
  };

  return (
    <>
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes popUp {
          0% {
            opacity: 0;
            transform: scale(0) rotate(-180deg);
          }
          60% {
            opacity: 1;
            transform: scale(1.15) rotate(5deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(239, 68, 68, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(239, 68, 68, 0.6), 0 0 60px rgba(239, 68, 68, 0.3);
          }
        }
        
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 1s ease-out forwards;
        }
        
        .animate-slideInLeft {
          animation: slideInLeft 1s ease-out forwards;
        }
        
        .animate-slideInRight {
          animation: slideInRight 1s ease-out forwards;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
        
        .animate-shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }
        
        .gradient-text {
          background: linear-gradient(135deg, #ef4444, #f97316, #eab308, #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .glass-effect {
          background: rgba(0, 0, 0, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
      `}</style>
      <StarsBackground
        className="min-h-screen"
        starColor="#ffffff"
        speed={30}
        factor={0.02}
      >
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          {/* Gradient overlay for depth */}
          <div className="absolute inset-0 z-10"></div>

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center relative z-20">
            <h1
              className={`text-6xl lg:text-7xl font-bold mb-8 leading-tight tracking-wide transition-all duration-1000 delay-200 ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ fontFamily: "Georgia, serif" }}
            >
              <span className="gradient-text">Your AI app</span>
              <br />
              <span className="text-white animate-float">
                is leaking secrets.
              </span>
            </h1>

            <p
              className={`text-xl text-gray-300 mb-12 leading-relaxed font-light max-w-3xl mx-auto transition-all duration-1000 delay-400 ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{
                fontFamily:
                  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              }}
            >
              Automated AI red teaming platform that attacks your AI
              applications, detects vulnerabilities, generates fixes, and
              notifies teams via Slack. Find prompt injection, jailbreaks, and
              PII leaks before attackers do.
            </p>
            <div
              className={`flex justify-center transition-all duration-1000 delay-500 ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <Link
                to="/upload"
                className="group relative bg-gradient-to-r from-red-500 to-red-600 text-white px-10 py-5 rounded-2xl text-lg font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-300 flex items-center justify-center hover:scale-105 hover:shadow-2xl animate-glow"
                style={{
                  fontFamily:
                    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                }}
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-shimmer"></div>
                <span className="relative z-10 flex items-center">
                  <span className="mr-3 text-xl animate-float">⚡</span>
                  Start Red Team Attack
                </span>
              </Link>
            </div>

            {/* Enhanced Stats */}
            <div
              className={`flex justify-center gap-12 mt-16 transition-all duration-1000 delay-700 ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <div className="text-center group">
                <div className="relative">
                  <div className="text-4xl font-bold gradient-text mb-2 group-hover:scale-110 transition-transform duration-300">
                    <SlidingNumber
                      number={1000}
                      fromNumber={0}
                      thousandSeparator=","
                    />
                    <span className="text-red-500">1,000</span>
                  </div>
                  <div className="absolute -inset-4 bg-red-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="text-sm text-gray-400 font-medium">
                  Vulnerabilities Found
                </div>
              </div>
              <div className="text-center group">
                <div className="relative">
                  <div className="text-4xl font-bold gradient-text mb-2 group-hover:scale-110 transition-transform duration-300">
                    <SlidingNumber number={99} fromNumber={0} />
                    <span className="text-red-500">99</span>%
                  </div>
                  <div className="absolute -inset-4 bg-orange-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="text-sm text-gray-400 font-medium">
                  Detection Rate
                </div>
              </div>
              <div className="text-center group">
                <div className="relative">
                  <div className="text-4xl font-bold gradient-text mb-2 group-hover:scale-110 transition-transform duration-300">
                    <SlidingNumber number={24} fromNumber={0} />
                    <span className="text-red-500">24</span>
                  </div>
                  <div className="absolute -inset-4 bg-yellow-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="text-sm text-gray-400 font-medium">
                  Hours Saved
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Application Demo Section */}
        <div className="relative py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className={`relative transition-all duration-1000 delay-800 ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              {/* Enhanced window with solid background */}
              <div className="relative bg-gray-900 rounded-3xl shadow-2xl border border-gray-700 overflow-hidden group hover:shadow-red-500/20 transition-all duration-500">
                {/* Glowing border effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-red-500/20 via-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                {/* Window controls */}
                <div className="flex items-center px-4 py-3 bg-gray-800 border-b border-gray-700">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="flex-1 text-center"></div>
                </div>

                {/* Enhanced app content */}
                <div className="relative p-16">
                  {/* Animated background pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-20 h-20 bg-red-500/30 rounded-full animate-float"></div>
                    <div
                      className="absolute top-20 right-20 w-16 h-16 bg-purple-500/30 rounded-full animate-float"
                      style={{ animationDelay: "1s" }}
                    ></div>
                    <div
                      className="absolute bottom-20 left-20 w-12 h-12 bg-blue-500/30 rounded-full animate-float"
                      style={{ animationDelay: "2s" }}
                    ></div>
                    <div
                      className="absolute bottom-10 right-10 w-24 h-24 bg-orange-500/30 rounded-full animate-float"
                      style={{ animationDelay: "0.5s" }}
                    ></div>
                  </div>
                  {/* Enhanced Game Header */}
                  <div className="text-center mb-8 relative z-10">
                    <div className="inline-flex items-center px-6 py-3 rounded-full glass-effect mb-4">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-glow mr-3"></div>
                      <h3
                        className="text-white text-xl font-semibold"
                        style={{
                          fontFamily:
                            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                        }}
                      >
                        ⚡ AI Red Team Challenge
                      </h3>
                    </div>
                    <p
                      className="text-gray-300 text-lg mb-6 font-light max-w-2xl mx-auto"
                      style={{
                        fontFamily:
                          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                      }}
                    >
                      Can you exploit all the AI vulnerabilities? Test your
                      skills against real-world attack patterns.
                    </p>

                    {/* Game Stats */}
                    {gameState === "playing" && (
                      <div className="flex justify-center gap-4 text-sm">
                        <div
                          className="bg-red-500/20 text-red-300 px-3 py-1 rounded-full font-light"
                          style={{
                            fontFamily:
                              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                          }}
                        >
                          Vulnerabilities:{" "}
                          <SlidingNumber number={score} fromNumber={0} />
                          /4
                        </div>
                        <div
                          className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full font-light"
                          style={{
                            fontFamily:
                              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                          }}
                        >
                          Attacks:{" "}
                          <SlidingNumber number={attempts} fromNumber={0} />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Enhanced Game Grid */}
                  <div className="grid grid-cols-4 gap-4 mb-8 relative z-10">
                    {Array.from({ length: 16 }).map((_, i) => (
                      <div
                        key={i}
                        className={`group relative h-16 rounded-xl cursor-pointer transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:rotate-2 ${getSquareColor(
                          i
                        )} opacity-100 hover:opacity-100 border-2 border-transparent hover:border-white/30 transform hover:z-20 overflow-hidden flex items-center justify-center`}
                        style={{
                          animationDelay: `${i * 100}ms`,
                          animation: isLoaded
                            ? "popUp 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards"
                            : "none",
                        }}
                        onClick={() => handleSquareClick(i)}
                        title={
                          gameState === "playing"
                            ? `Attack square ${i + 1}`
                            : getCategoryInfo(i).description
                        }
                      >
                        {/* Hover glow effect */}
                        <div className="absolute inset-0 rounded-xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        {/* Content */}
                        <div className="relative z-10 h-full flex items-center justify-center">
                          {getSquareContent(i)}
                        </div>
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 rounded-xl animate-shimmer opacity-0 group-hover:opacity-100"></div>
                      </div>
                    ))}
                  </div>

                  {/* Game Message */}
                  {gameMessage && (
                    <div className="text-center mb-4">
                      <p
                        className="text-white text-sm font-light"
                        style={{
                          fontFamily:
                            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                        }}
                      >
                        {gameMessage}
                      </p>
                    </div>
                  )}

                  {/* Game Controls */}
                  <div className="text-center">
                    {gameState === "waiting" && (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          console.log("Button clicked!");
                          startGame();
                        }}
                        className="bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-red-500/25 flex items-center space-x-3 text-lg cursor-pointer relative z-10"
                        style={{
                          fontFamily:
                            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                        }}
                      >
                        <span className="text-xl">⚡</span>
                        <span>Start Red Team Attack</span>
                      </button>
                    )}

                    {gameState === "playing" && (
                      <div className="space-y-2">
                        <button
                          onClick={() => setShowHints(!showHints)}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors mr-2"
                          style={{
                            fontFamily:
                              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                          }}
                        >
                          {showHints ? "Hide" : "Show"} Hints
                        </button>
                        <button
                          onClick={startGame}
                          className="bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
                          style={{
                            fontFamily:
                              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                          }}
                        >
                          🔄 Restart
                        </button>
                      </div>
                    )}

                    {gameState === "completed" && (
                      <div className="space-y-3">
                        <div
                          className="text-green-400 font-medium"
                          style={{
                            fontFamily:
                              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                          }}
                        >
                          🏆 Challenge Complete!
                        </div>
                        <div className="flex gap-3 justify-center">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              console.log("Play Again clicked!");
                              startGame();
                            }}
                            className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-red-500/25 flex items-center space-x-2 cursor-pointer relative z-10"
                            style={{
                              fontFamily:
                                '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                            }}
                          >
                            <span>🔄</span>
                            <span>Play Again</span>
                          </button>
                          <Link
                            to="/upload"
                            onClick={() =>
                              console.log(
                                "Attack Real Vulnerabilities clicked!"
                              )
                            }
                            className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-lg hover:shadow-green-500/25 flex items-center space-x-2 cursor-pointer relative z-10"
                            style={{
                              fontFamily:
                                '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                            }}
                          >
                            <span>⚡</span>
                            <span>Attack Real Vulnerabilities</span>
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Hints */}
                  {showHints && gameState === "playing" && (
                    <div className="mt-4 p-3 bg-blue-900/30 rounded-lg">
                      <p
                        className="text-blue-300 text-xs text-center font-light"
                        style={{
                          fontFamily:
                            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                        }}
                      >
                        💡 Hint: Vulnerabilities are hidden in different AI
                        attack categories. Look for patterns in Prompt
                        Injection, Jailbreak, System Extraction, and PII
                        Leakage!
                      </p>
                    </div>
                  )}

                  {/* Legend */}
                  <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                    {vulnerabilityCategories.map((category, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div
                          className={`w-3 h-3 rounded ${getSquareColor(
                            index
                          ).replace("bg-", "bg-")}`}
                        ></div>
                        <span
                          className="text-gray-300 font-light"
                          style={{
                            fontFamily:
                              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                          }}
                        >
                          {category.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Features Section */}
        <div className="relative py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-20 left-20 w-32 h-32 bg-red-500/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl"></div>
            </div>

            <div className="text-center mb-20 relative z-10">
              <h2
                className="text-4xl lg:text-5xl font-bold text-white mb-6 gradient-text"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Why Choose RUNE?
              </h2>
              <p
                className="text-xl text-gray-300 font-light max-w-3xl mx-auto"
                style={{
                  fontFamily:
                    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                }}
              >
                Automated AI red teaming powered by advanced attack generation
                and real-time vulnerability detection
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8 relative z-10">
              {vulnerabilityCategories.map((category, index) => (
                <div
                  key={index}
                  className="group relative bg-slate-900/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 hover:border-red-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/20 hover:-translate-y-2"
                >
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-red-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="relative z-10">
                    <div
                      className={`w-16 h-16 ${getSquareColor(
                        index
                      )} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                    >
                      <span className="text-white text-2xl font-bold">
                        {index === 0
                          ? "💉"
                          : index === 1
                          ? "🔓"
                          : index === 2
                          ? "📋"
                          : "🔍"}
                      </span>
                    </div>
                    <h3
                      className="text-xl font-semibold text-white mb-4 group-hover:text-red-400 transition-colors duration-300"
                      style={{
                        fontFamily:
                          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                      }}
                    >
                      {category.name}
                    </h3>
                    <p
                      className="text-gray-300 text-base leading-relaxed font-light group-hover:text-gray-200 transition-colors duration-300"
                      style={{
                        fontFamily:
                          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                      }}
                    >
                      {category.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </StarsBackground>
    </>
  );
};

export default LandingPage;
