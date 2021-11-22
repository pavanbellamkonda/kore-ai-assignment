import express from 'express';
import path from 'path';
import webPush from './web-push';

const router = express.Router();
router.use(express.static(path.join(__dirname + '/client')));
const usernameSubscriptionMap = new Map<string, PushSubscription>();
const chatMessageMap = new Map<string, string[]>();

/**
 * Route to register user and create
 * a notification subscription
 */
router.post('/api/register-user', (req, res) => {
  try {
    const body = req.body;
    if (!body || !body.username || !body.subscription) {
      res.status(422).send('Missing One or more fields');
    }
    usernameSubscriptionMap.set(body.username, body.subscription);
    res.status(201).json({ success: true });
  } catch(err: any) {
    console.error(err);
    res.status(500).send('Error');
  }
});

/**
 * Route to logout user and delete
 * subsscription
 */
router.post('/api/logout-user', (req, res) => {
  try {
    const body = req.body;
    if (!body || !body.username) {
      res.status(422).send('Missing One or more fields');
    }
    usernameSubscriptionMap.delete(body.username);
    res.json({ success: true });
  } catch(err: any) {
    console.error(err);
    res.status(500).send('Error');
  }
});

/**
 * Route to store and send message as notification
 */
router.post('/api/send-message', (req, res) => {
  try {
    const body = req.body;
    if (!body || !body.message || !body.friend || !body.message) {
      res.status(422).send('Missing One or more fields');
    }
    const chatId = [body.username, body.friend].sort().join('-');
    if (chatMessageMap.has(chatId)) {
      chatMessageMap.set(chatId, [...chatMessageMap.get(chatId) as string[], body.message]);
    } else {
      chatMessageMap.set(chatId, [body.message]);
    }
    const friendSub = usernameSubscriptionMap.get(body.friend);
    if (friendSub) {//@ts-ignore
      webPush.sendNotification(friendSub, JSON.stringify(body)).catch(err => console.error(err));
    }
    res.status(201).json({ success: true });
  } catch(err: any) {
    console.error(err);
    res.status(500).send('Error');
  }
});

export default router;