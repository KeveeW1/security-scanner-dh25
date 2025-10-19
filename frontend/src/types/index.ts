export type Severity = 'critical' | 'high' | 'medium' | 'low' | 'info';

export interface Vulnerability {
  severity: Severity;
  line_number: number | null;
  issue_type: string;
  description: string;
  fix_suggestion: string;
}

export interface ScanResult {
  scanId: string;
  filename: string;
  vulnerabilities: Vulnerability[];
  summary: {
    total: number;
    critical: number;
    high: number;
    medium: number;
    low: number;
    info: number;
  };
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}
