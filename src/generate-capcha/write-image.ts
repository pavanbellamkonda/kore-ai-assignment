import fs from 'fs';
import path from 'path';
/**
 * Creating images folder to store captcha images
 */
 try {
  fs.mkdirSync(path.resolve(__dirname, 'images'));
} catch(err: any) {
  if (err.code !== 'EEXIST') {
    throw err;
  }
}

export async function writeImage(capchaId: string, imageBuffer: Buffer) {
  const imageFileName = `${capchaId}.png`;
  const imageUrl = `http://localhost:3000/generate-capcha/images/${imageFileName}`;
  return new Promise((resolve, reject) => {
    fs.writeFile(path.join(__dirname + `/images/${imageFileName}`), imageBuffer, (err) => {
      if (err) {
        reject(err);
      }
      resolve(imageUrl);
    })

  });
}