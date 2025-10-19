import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const db = new Database(path.join(__dirname, '../../codeguardian.db'));

// Initialize database schema
db.exec(`
  CREATE TABLE IF NOT EXISTS scans (
    id TEXT PRIMARY KEY,
    filename TEXT NOT NULL,
    code TEXT NOT NULL,
    results TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS vulnerabilities (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    scan_id TEXT NOT NULL,
    severity TEXT NOT NULL,
    line_number INTEGER,
    issue_type TEXT NOT NULL,
    description TEXT NOT NULL,
    fix_suggestion TEXT,
    FOREIGN KEY (scan_id) REFERENCES scans(id)
  );
`);

export default db;
