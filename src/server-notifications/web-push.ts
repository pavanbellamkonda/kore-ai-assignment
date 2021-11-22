import webPush from 'web-push';
// const publicVapidKey = process.env.VAPID_PUBLIC_KEY;
// const privateVapidKey = process.env.VAPID_PRIVATE_KEY;

const VAPID_PUBLIC_KEY = 'VAPID_PUBLIC_KEY';
const VAPID_PRIVATE_KEY = 'VAPID_PRIVATE_KEY';
const publicVapidKey = VAPID_PUBLIC_KEY;
const privateVapidKey = VAPID_PRIVATE_KEY;

webPush.setVapidDetails('mailto:test@test.com', String(publicVapidKey).trim(), String(privateVapidKey).trim());

export default webPush;