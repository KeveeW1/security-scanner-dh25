import dotenv from 'dotenv';
// Load environment variables FIRST before any other imports
dotenv.config();

import express from 'express';
import cors from 'cors';
import scanRoutes from './routes/scanRoutes.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes
app.use('/api', scanRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'CodeGuardian API is running' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`CodeGuardian backend running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});
