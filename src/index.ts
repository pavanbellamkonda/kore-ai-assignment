import express from 'express';
import dotenv from 'dotenv';
import bitlyShortener from './bitly-shortener';
import allPaginatedRecords from './all-paginated-records';
import generateCapcha from './generate-capcha';
import serverNotifications from './server-notifications';

dotenv.config();
const app = express();
app.use(express.json());

app.use('/bitly-shortener', bitlyShortener);
app.use('/all-paginated-records', allPaginatedRecords);
app.use('/generate-capcha', generateCapcha);
app.use('/server-notifications', serverNotifications);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Listening on port ' + port);
});

