const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const express = require('express');
const app = express();

app.get('/test', (req: any, res: any) => {
  admin
    .firestore()
    .collection('Private')
    .get()
    .then((data: Array<Object>) => {
      let dataPool: Array<Object> = [];
      data.forEach((doc: any) => {
        dataPool.push(doc.data());
      });
      return res.json(dataPool);
    });
});

app.get('/another', (req: any, res: any) => {
  return res.json({
    type: 'success',
    payload: {
      data: 'got the object successfully'
    }
  });
});

exports.api = functions.https.onRequest(app);
