import express from 'express';
import type { Express, Request, Response } from 'express';
import { pool } from './db';

const app: Express = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Routes
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to Tagus Score API' });
});

app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'okay' });
});

app.get('/api/health/db', async (req: Request, res: Response) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'okay' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: (error as Error).message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
