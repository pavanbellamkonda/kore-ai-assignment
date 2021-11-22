import axios from 'axios';

export async function shorten(longUrl: string): Promise<string> {
  const response = await axios({
    method: 'POST',
    url: 'https://api-ssl.bitly.com/v4/shorten',
    data: JSON.stringify({
      long_url: longUrl,
      domain: 'bit.ly',
      group_id: process.env.BITLY_GROUP_ID,
    }),
    headers: {
      Authorization: `Bearer ${process.env.BITLY_ACCESS_TOKEN}`,
      'Content-Type': 'application/json'
    }
  });
  return response.data.link;
}