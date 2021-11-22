self.addEventListener('push', (event) => {
  const data = event['data'].json();
  console.log('Push message received', data);
  self['registration'].showNotification('From: ' + data.friend, {
    body: data.message,
  });
});