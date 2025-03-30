import express from 'express';
import cors from 'cors';
import screenshotUtil from './utils/screenshotUtil.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/healthz', (req, res) => {
  res.json({ status: 'ok' });
});

app.post('/api/screenshot', async (req, res) => {
  const { url, device, format } = req.body;
  try {
    const imageBuffer = await screenshotUtil(url, { device, format });
    res.set('Content-Type', `image/${format || 'png'}`);
    res.send(imageBuffer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Screenshot failed' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
