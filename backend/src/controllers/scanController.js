import { v4 as uuidv4 } from 'uuid';
import db from '../models/database.js';
import geminiService from '../services/geminiService.js';

export const analyzecode = async (req, res) => {
  try {
    const { code, filename } = req.body;

    if (!code) {
      return res.status(400).json({ error: 'Code is required' });
    }

    const scanId = uuidv4();

    // Analyze code with Gemini
    const vulnerabilities = await geminiService.analyzeCode(code, filename || 'code.js');

    // Save scan to database
    const insertScan = db.prepare(`
      INSERT INTO scans (id, filename, code, results)
      VALUES (?, ?, ?, ?)
    `);
    insertScan.run(scanId, filename || 'untitled', code, JSON.stringify(vulnerabilities));

    // Save vulnerabilities
    if (vulnerabilities.length > 0) {
      const insertVuln = db.prepare(`
        INSERT INTO vulnerabilities (scan_id, severity, line_number, issue_type, description, fix_suggestion)
        VALUES (?, ?, ?, ?, ?, ?)
      `);

      for (const vuln of vulnerabilities) {
        insertVuln.run(
          scanId,
          vuln.severity,
          vuln.line_number,
          vuln.issue_type,
          vuln.description,
          vuln.fix_suggestion
        );
      }
    }

    res.json({
      scanId,
      filename: filename || 'untitled',
      vulnerabilities,
      summary: {
        total: vulnerabilities.length,
        critical: vulnerabilities.filter(v => v.severity === 'critical').length,
        high: vulnerabilities.filter(v => v.severity === 'high').length,
        medium: vulnerabilities.filter(v => v.severity === 'medium').length,
        low: vulnerabilities.filter(v => v.severity === 'low').length,
        info: vulnerabilities.filter(v => v.severity === 'info').length,
      }
    });
  } catch (error) {
    console.error('Error in analyzeCode:', error);
    res.status(500).json({ error: error.message });
  }
};

export const getScan = async (req, res) => {
  try {
    const { id } = req.params;

    const scan = db.prepare('SELECT * FROM scans WHERE id = ?').get(id);
    if (!scan) {
      return res.status(404).json({ error: 'Scan not found' });
    }

    const vulnerabilities = db.prepare('SELECT * FROM vulnerabilities WHERE scan_id = ?').all(id);

    res.json({
      ...scan,
      results: JSON.parse(scan.results),
      vulnerabilities
    });
  } catch (error) {
    console.error('Error in getScan:', error);
    res.status(500).json({ error: error.message });
  }
};

export const getAllScans = async (req, res) => {
  try {
    const scans = db.prepare('SELECT id, filename, created_at FROM scans ORDER BY created_at DESC LIMIT 50').all();
    res.json(scans);
  } catch (error) {
    console.error('Error in getAllScans:', error);
    res.status(500).json({ error: error.message });
  }
};

export const chatWithAI = async (req, res) => {
  try {
    const { question, context } = req.body;

    if (!question) {
      return res.status(400).json({ error: 'Question is required' });
    }

    const answer = await geminiService.chatAboutVulnerability(question, context || {});

    res.json({ answer });
  } catch (error) {
    console.error('Error in chatWithAI:', error);
    res.status(500).json({ error: error.message });
  }
};
