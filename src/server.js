import express from 'express';
import cors from 'cors';
import { captureScreenshot } from './utils/screenshotUtil.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'ScrollSnap backend running' });
});

app.post('/api/screenshot', async (req, res) => {
  const { url } = req.body;

  if (!url || !url.startsWith('http')) {
    return res.status(400).json({ error: 'Invalid or missing URL' });
  }

  try {
    const buffer = await captureScreenshot(url);
    res.set('Content-Type', 'image/png');
    res.send(buffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Screenshot capture failed.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`ScrollSnap backend listening on port ${PORT}`));
