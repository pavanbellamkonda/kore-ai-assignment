import { randomBytes } from 'crypto';
import { createCanvas } from 'canvas';

export function genetateCaptchaImage(length: number) {
  const captchaText = randomBytes(length/2).toString('hex');
  const imageBuffer = createImage(captchaText);
  const capchaId = randomBytes(length).toString('hex');
  return { imageBuffer, captchaText, capchaId };
}

function createImage(text: string) {
  const textToFill = text.split('').join(' ');
  const width = text.length * 20;
  const height = 40;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  /**
   * Black background
   */
  ctx.fillStyle = '#000';
  /**
   * Fill from co-ordinates (0,0) to (width, height)
   */
  ctx.fillRect(0, 0, width, height);
  ctx.font = '20px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#fff';
  ctx.fillText(textToFill, width/2, height/2);
  return canvas.toBuffer();
}
