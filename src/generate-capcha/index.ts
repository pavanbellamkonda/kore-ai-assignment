import express from 'express';
import path from 'path';
import { genetateCaptchaImage } from './generate-capcha';
import { writeImage } from './write-image';

const router = express.Router();
const imagesRouter = express.Router();

/**
 * Stores capchaId: capchaText
 * Useful for validating capcha
 */
const capchaMap = new Map<string, string>();

router.use(express.static(path.join(__dirname + '/client')));
imagesRouter.use(express.static(path.join(__dirname + '/images')));

/**
 * Route read images
 */
router.use('/images', imagesRouter);

/**
 * Generate capcha and send base64 as response
 */
router.post('/api/generate/v1', async (req, res) => {
  try {
    const body = req.body;
    if (!body || !body.length) {
      res.status(422).send('Missing length');
    }
    const capchaLength = body.length;
    const { captchaText, imageBuffer, capchaId } = genetateCaptchaImage(capchaLength);
    capchaMap.set(capchaId, captchaText);
    res.json({ image: imageBuffer.toString('base64'), capchaId });
  } catch(err: any) {
    console.error(err);
    res.status(500).send('Error');
  }
});

/**
 * Generate capcha and store it in a folder.
 * Send url as response
 */
router.post('/api/generate/v2', async (req, res) => {
  try {
    const body = req.body;
    if (!body && !body.length) {
      res.status(422).send('Missing length');
    }
    const capchaLength = body.length;
    const { captchaText, imageBuffer, capchaId } = genetateCaptchaImage(capchaLength);
    capchaMap.set(capchaId, captchaText);
    const imageUrl = await writeImage(capchaId, imageBuffer);
    res.json({ imageUrl, capchaId });
  } catch(err: any) {
    console.error(err);
    res.status(500).send('Error');
  }
});

/**
 * Route to validate capcha
 */
router.post('/api/validate', async (req, res) => {
  try {
    const body = req.body;
    if (!body || !body.capchaId || !body.capchaText) {
      res.status(422).send('Missing length');
    }
    const capchaId = body.capchaId;
    const capchaText = body.capchaText;
    if (capchaMap.get(capchaId) === capchaText) {
      res.json({ valid: true });
    } else {
      res.json({ valid: false });
    }
  } catch(err: any) {
    console.error(err);
    res.status(500).send('Error');
  }
});

export default router;