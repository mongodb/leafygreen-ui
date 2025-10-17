import express from 'express';

const port = 43210;

// This utility is for Node dev use only.
// Dynamically require express to avoid issues in browser environments
const app = express();

// Allow cross-origin requests
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.sendStatus(204);
    return;
  }
  next();
});

const MicroUICache = new Map<string, string>();

app.get('/', (_req: any, res: any) => {
  res.set('Content-Type', 'text/html');
});

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.post('/serve', (req: any, res: any) => {
  const html = req.body.html;
  const id = req.body.id;

  if (!html || typeof html !== 'string') {
    res.status(400).json({ error: 'No html string provided' });
    return;
  }

  if (!id || typeof id !== 'string') {
    res.status(400).json({ error: 'No id string provided' });
    return;
  }

  console.log('Serving ui with id: ', id);
  MicroUICache.set(id, html);
  res.status(200).json({ success: true });
});

app.get('/ui', (req: any, res: any) => {
  const id = req.query.id;

  if (!id || typeof id !== 'string') {
    res.status(400).send('No id query parameter provided');
    return;
  }

  const html = MicroUICache.get(id);

  if (!html) {
    res.status(404).send('No HTML found for the given url');
    return;
  }

  console.log('Returning UI', id);
  res.set('Content-Type', 'text/html');
  res.send(html);
});

const server = app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Express server running on http://localhost:${port}`);
});
