import { Severity } from "../types";

export const getSeverityColor = (severity: Severity): string => {
  switch (severity) {
    case "critical":
      return "bg-gradient-to-br from-red-900/40 to-red-800/30 border-red-500/50 text-red-100";
    case "high":
      return "bg-gradient-to-br from-orange-900/40 to-orange-800/30 border-orange-500/50 text-orange-100";
    case "medium":
      return "bg-gradient-to-br from-amber-900/40 to-amber-800/30 border-amber-500/50 text-amber-100";
    case "low":
      return "bg-gradient-to-br from-blue-900/40 to-blue-800/30 border-blue-500/50 text-blue-100";
    case "info":
      return "bg-gradient-to-br from-gray-800/40 to-gray-700/30 border-gray-500/50 text-gray-200";
    default:
      return "bg-gradient-to-br from-gray-800/40 to-gray-700/30 border-gray-500/50 text-gray-200";
  }
};

export const getSeverityBadgeColor = (severity: Severity): string => {
  switch (severity) {
    case "critical":
      return "bg-red-600 text-white shadow-lg shadow-red-600/30";
    case "high":
      return "bg-orange-600 text-white shadow-lg shadow-orange-600/30";
    case "medium":
      return "bg-amber-600 text-white shadow-lg shadow-amber-600/30";
    case "low":
      return "bg-blue-600 text-white shadow-lg shadow-blue-600/30";
    case "info":
      return "bg-gray-600 text-white shadow-lg shadow-gray-600/30";
    default:
      return "bg-gray-600 text-white shadow-lg shadow-gray-600/30";
  }
};
