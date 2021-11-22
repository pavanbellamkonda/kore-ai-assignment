const VAPID_PUBLIC_KEY = 'BAElDH6JRokrqhqoysE31o33BHiB36kVqOW_cZchTyAeoLeZZDjldAFB9OqRAplPFQfd1se43j5zRu0ayVXf4ZM';
let pushSubscription: PushSubscription;
if ('serviceWorker' in navigator) {
  registerServiceWorker()
    .then(registerPush)
    .then(subscription => {
      pushSubscription = subscription;
    });
}

async function registerServiceWorker() {
  const existingRegistration = await navigator.serviceWorker.getRegistration('/server-notifications/');
  if (existingRegistration) return existingRegistration;
  return navigator.serviceWorker.register('/server-notifications/worker.js', {
    scope: '/server-notifications/',
  });
}

async function registerPush(swRegistration: ServiceWorkerRegistration) {
  return swRegistration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
  });
}

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (var i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
