const userNameFormElement = document.getElementById('user-name-form');

let username:string;

userNameFormElement && userNameFormElement.addEventListener('submit', async (event) => {
  event.preventDefault();
  const inputElement = document.getElementById('username');
  if (!inputElement) return;
  username = String(inputElement['value']);
  if (!username) return;
  await registerUser();
  const resultElement = document.getElementById('result');
  if (!resultElement) return;
  resultElement.style.display = '';
});

const logoutButtonElement = document.getElementById('logout-button');

logoutButtonElement && logoutButtonElement.addEventListener('click', async (event) => {
  event.preventDefault();
  await logoutUser();
  const resultElement = document.getElementById('result');
  if (!resultElement) return;
  resultElement.style.display = 'none';
});

const sendMessageFormElement = document.getElementById('send-message-form');

sendMessageFormElement && sendMessageFormElement.addEventListener('submit', async (event) => {
  event.preventDefault();
  const friendInputElement = document.getElementById('friend');
  if (!friendInputElement) return;
  const friend = String(friendInputElement['value']);
  if (!friend) return;
  const messageInputElement = document.getElementById('message');
  if (!messageInputElement) return;
  const message = String(messageInputElement['value']);
  if (!message) return;
  await sendMessage(friend, message);
  const chatElement = document.getElementById('chat');
  if (!chatElement) return;
  const messageElement = document.createElement('p');
  messageElement.innerText = message;
  chatElement.appendChild(messageElement);
});

async function registerUser() {
  const subscriptionJson = pushSubscription.toJSON();
  const payload = {
    subscription: subscriptionJson,
    username
  }
  const rawResponse = await fetch('/server-notifications/api/register-user', {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!rawResponse.ok) {
    throw new Error('Failed to subscribe to push notifications');
  }
}

async function logoutUser() {
  const rawResponse = await fetch('/server-notifications/api/logout-user', {
    method: 'POST',
    body: JSON.stringify({username}),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!rawResponse.ok) {
    throw new Error('Failed to subscribe to push notifications');
  }
}

async function sendMessage(friend: string, message: string) {
  const rawResponse = await fetch('/server-notifications/api/send-message', {
    method: 'POST',
    body: JSON.stringify({username, message, friend}),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!rawResponse.ok) {
    throw new Error('Failed to subscribe to push notifications');
  }
}