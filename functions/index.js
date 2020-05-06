/* eslint-disable */
const xlsx = require('node-xlsx').default;
const cors = require('cors');
const express = require('express');
const admin = require('firebase-admin');
const functions = require('firebase-functions');

const path = require('path');
const os = require('os');
const fs = require('fs');

// Admin
admin.initializeApp();
const db = admin.firestore();
const storage = admin.storage();

// App
const app = express();
app.use(cors({ origin: true }));

// Api
const REGION = "asia-east2"

app.get('/', (req, res) => {
  res.statusCode = 404
  res.setHeader('Content-Type', 'application/json')
  res.send({
    'status': {
      'code': 404,
      'description': 'Invalid shop code'
    },
    'data': null,
  })
})

app.get('/:name', async (req, res) => {
  const lineId = req.params.name
  var shopData = {}
  res.statusCode = 401
  res.setHeader('Content-Type', 'application/json')

  try {
    const shops = await readShopsFormFirestore(lineId)
    if (shops.length > 0) {
      const shop = shops[0]
      Object.entries(shop).forEach((element) => {
        shopData[element[0]] = element[1]
      })

      const sheetsData = await readFileFormStorage(shop.file)
      categories = []
      await sheetsData.forEach(async sheet => {
        var key = sheet[0].trim().toLowerCase().split(' ').join('_')
        var value = sheet[1]
        switch (key) {
          case 'payment':
          case 'delivery_fee':
            shopData[key] = value
            break
          default:
            categories.push({
              'name' : sheet[0],
              'menus' : value
            })
            break;
        }
      })
      shopData['categories'] = categories
      if (sheetsData) {
        res.statusCode = 200
      } else {
        res.statusCode = 401
      }
    }
  } catch (error) {
    res.statusCode = 500
  }

  var callback
  switch(res.statusCode) {
    case 200:
      callback = {
        'status': {
          'code': 200,
          'description': 'Success'
        },
        'data' : shopData
      }
      break
    case 401:
      callback = {
        'status': {
          'code': 401,
          'description': 'Google Sheet API error'
        },
        'data' : shopData
      }
      break
    default:
      callback = {
        'status': {
            'code': res.statusCode,
            'description': 'Invalid shop code'
        },
        'data': null,
      }
  }
  res.send(callback)
});

async function readShopsFormFirestore(lineId) {
  try {
    const shop = await db.collection('shops').where('line_id', '==', lineId).get()
    var list = []
    if (!shop.empty) {
      shop.forEach((doc) => {
        list.push(doc.data())
      })
    }
    return list
  } catch (error) {
    return []
  }
}

async function filterDataInSheet(rows){
  if (rows.length > 0) {
    const headers = rows[0]
    var list = []

    // Rows Data
    for (r = 1; r < rows.length; r++) {
      var row = rows[r]
      var temp = {}
      var isData = false
      // Column Data
      for (c = 0; c < headers.length; c++) {
        var header = headers[c]
        temp[header] = (row[c] || row[c] == 0) ? row[c] : ''
        if (temp[header]) {
          isData = true
        }
      }
      if (isData) {
        list.push(temp)
      }
    }
    return list
  } else {
    return []
  }
}

async function readFileFormStorage(fileName) {
  try {
    const filePath = 'data'
    const tempFilePath = path.join(os.tmpdir(), fileName);
    var datas = []

    // Read a file Form Storage
    var bucket = storage.bucket();
    await bucket.file(`${filePath}/${fileName}`).download({destination: tempFilePath});

    // Parse a file excel
    const sheets = xlsx.parse(tempFilePath);
    const promises = sheets.map(async (sheet) => {
      datas.push([sheet.name, await filterDataInSheet(sheet.data)])
    })
    await Promise.all(promises)
    return datas
  } catch (error) {
    return []
  }
}


// Expose Express API as a single Cloud Function:
// exports.widgets = functions.https.onRequest(app);
exports.shop = functions.region(REGION).https.onRequest(app);
