import axios from 'axios';
import { ScanResult } from '../types';

const API_URL = 'http://localhost:3001/api';

export const analyzeCode = async (code: string, filename: string): Promise<ScanResult> => {
  const response = await axios.post(`${API_URL}/analyze`, { code, filename });
  return response.data;
};

export const chatWithAI = async (question: string, context?: any): Promise<string> => {
  const response = await axios.post(`${API_URL}/chat`, { question, context });
  return response.data.answer;
};

export const getAllScans = async () => {
  const response = await axios.get(`${API_URL}/scans`);
  return response.data;
};
