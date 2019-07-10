const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const express = require('express');
const cors = require('cors')
const app = express();

app.use(cors())

app.get('/searchPublished/:searchString', (req: any, res: any,next: any) => {
    console.log(req.body.title);
  let regex = new RegExp(req.params.searchString, 'gim');
  admin
    .firestore()
    .collection('Published')
    .get()
    .then((data: any) => {
      let matchDocuments: Array<Object> = [];
      data.forEach((doc: any) => {
        const docData = doc.data();
        if (docData.title.match(regex)) {
          matchDocuments.push({
              title : docData.title,
              location: docData.location,
              cardLocation: docData.cardLocation,
              image: docData.image
          });
        }
      });
      return res.json(matchDocuments);
    });
});

exports.api = functions.region('asia-northeast1').https.onRequest(app);
