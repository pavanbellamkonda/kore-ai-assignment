import express from 'express';
import path from 'path';
import { shorten } from './bitly-shortener';

const router = express.Router();

router.use(express.static(path.join(__dirname + '/client')));
router.post('/api/shorten', async (req, res) => {
  try {
    const body = req.body;
    if (!body && !body.url) {
      res.status(422).send('Missing url');
    }
    const longUrl = body.url;
    const shortUrl = await shorten(longUrl);
    res.json({ shortUrl });
  } catch(err: any) {
    console.error(err);
    res.status(500).send('Error');
  }
});

export default router;