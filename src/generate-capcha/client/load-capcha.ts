const capchaLengthFormElement = document.getElementById('capcha-length-form');
const capchaValidateFormElement = document.getElementById('capcha-validate-form');
const version1Element = document.getElementById('radio-v1');
const version2Element = document.getElementById('radio-v2');
let version = 'v1';

version1Element && version1Element.addEventListener('click', () => {
  version = 'v1';
});

version2Element && version2Element.addEventListener('click', () => {
  version = 'v2';
});
let currentCapchaId: string;
capchaLengthFormElement && capchaLengthFormElement.addEventListener('submit', async (event) => {
  event.preventDefault();
  const inputElement = document.getElementById('length');
  if (!inputElement) return;
  const length = Number(inputElement['value']);
  if (!length) return;
  const rawResponse = await fetch('/generate-capcha/api/generate/' + version, {
    method: 'POST',
    body: JSON.stringify({ length }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const response = await rawResponse.json();
  currentCapchaId = response.capchaId;
  const resultElement = document.getElementById('result');
  if (!resultElement) return;
  resultElement.style.display = '';
  const imageElement = document.getElementById('capcha-image');
  if (imageElement) {
    if (version === 'v1') {
      imageElement['src'] = 'data:image/png;base64, ' + response.image;
    } else {
      imageElement['src'] = response.imageUrl;
    }
    const validateInputElement = document.getElementById('capcha-validate');
    if (!validateInputElement) return;
    validateInputElement.setAttribute('minlength', String(length));
    validateInputElement.setAttribute('maxlength', String(length));
  }
});

capchaValidateFormElement && capchaValidateFormElement.addEventListener('submit', async (event) => {
  event.preventDefault();
  const inputElement = document.getElementById('capcha-validate');
  if (!inputElement) return;
  const capchaText = inputElement['value'];
  if (!capchaText) return;
  const rawResponse = await fetch('/generate-capcha/api/validate', {
    method: 'POST',
    body: JSON.stringify({ capchaId: currentCapchaId, capchaText }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const response = await rawResponse.json();
  const resultElement = document.getElementById('validate-result');
  if (!resultElement) return;
  resultElement.innerText = response.valid ? 'Valid' : 'Invalid';
});
