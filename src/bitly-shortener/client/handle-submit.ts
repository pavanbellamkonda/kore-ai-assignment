const bitlyFormElement = document.getElementById('bitly-form');

bitlyFormElement && bitlyFormElement.addEventListener('submit', async (event) => {
  event.preventDefault();
  const inputElement = document.getElementById('url');
  if (!inputElement) return;
  const url = inputElement['value'];
  if (!url) return;
  const rawResponse = await fetch('/bitly-shortener/api/shorten', {
    method: 'POST',
    body: JSON.stringify({ url }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const response = await rawResponse.json();
  const resultElement = document.getElementById('result');
  if (!resultElement) return;
  resultElement.style.display = '';
  const shortUrlElement = document.getElementById('short-url');
  shortUrlElement && (shortUrlElement['value'] = response.shortUrl);
  const longUrlElement = document.getElementById('long-url');
  longUrlElement && (longUrlElement['value'] = url);
  inputElement['value'] = 'http://';
});
