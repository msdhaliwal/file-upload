let express = require("express");
let multer = require("multer");
let app = express();
let bodyParser = require('body-parser')
let jsonParser = bodyParser.json()
let storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./uploads");
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

let cpUpload = multer({ dest: 'uploads/' }).fields([{ name: 'file', maxCount: 1 }, { name: 'myfile2', maxCount: 1 }])
const upload = multer({ storage: storage }).single("file");

app.use(express.static("public"));

app.post("/upload", function (req, res) {
  console.log(0);
  upload(req, res, function (err) {
    if (err) {
      return res.end("Error uploading file.");
    }
    console.log(req.file);
    return res.send({'age': 25});
  });
});

app.post('/upload2', cpUpload, function (req, res, next) {
  cpUpload(req, res, function (err) {
    if (err) {
      // A Multer error occurred when uploading.
      return res.json({code: 'error1'})
    }
    return res.json({code: 'all good', files: req.files})
    // Everything went fine.
  });
});
app.listen(2000, function () {
  console.log("Server is running on port 2000");
});