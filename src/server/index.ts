import express, { Express, Request, Response } from 'express';

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

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
