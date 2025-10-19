import { Severity } from '../types';

export const getSeverityColor = (severity: Severity): string => {
  switch (severity) {
    case 'critical':
      return 'bg-red-100 border-red-500 text-red-900';
    case 'high':
      return 'bg-orange-100 border-orange-500 text-orange-900';
    case 'medium':
      return 'bg-yellow-100 border-yellow-500 text-yellow-900';
    case 'low':
      return 'bg-blue-100 border-blue-500 text-blue-900';
    case 'info':
      return 'bg-gray-100 border-gray-500 text-gray-900';
    default:
      return 'bg-gray-100 border-gray-500 text-gray-900';
  }
};

export const getSeverityBadgeColor = (severity: Severity): string => {
  switch (severity) {
    case 'critical':
      return 'bg-red-600 text-white';
    case 'high':
      return 'bg-orange-600 text-white';
    case 'medium':
      return 'bg-yellow-600 text-white';
    case 'low':
      return 'bg-blue-600 text-white';
    case 'info':
      return 'bg-gray-600 text-white';
    default:
      return 'bg-gray-600 text-white';
  }
};
