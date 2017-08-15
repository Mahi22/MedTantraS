import multer from 'multer';
import csv from 'csvtojson';

import { categorizeJson } from './helper';

// configuring Multer to use files directory for storing files
// this is important because later we'll need to access file path
const storage = multer.diskStorage({
  destination: './files',
  filename(req, file, cb) {
    cb(null, `${new Date()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

export default function api(app) {
  return {
    fileUpload: function() {
      app.post('/files', upload.single('file'), (req, res) => {
        const file = req.file; // file passed from client
        const meta = req.body; // all other values passed from the client, like name, etc..

        const resJson = []

        csv()
          .fromFile(req.file.path)
          .on('json',(jsonObj) => {
            resJson.push(categorizeJson(jsonObj));
          })
          .on('done',(error) => {
            if (error) {
              res.status(500).send(error);
            }
            res.send(resJson);
          });
      });
    }
  }
}


/*
Old

const resJson = [];
const highBothBP = [];
const highSystolicBp = [];
const highDiastolicBp = [];
res.send({
  highBothBP,
  highSystolicBp,
  highDiastolicBp
})

*/
