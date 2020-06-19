let express = require("express");
let multer = require("multer");
let app = express();
let storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./uploads");
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});
const upload = multer({ storage: storage }).single("myfile");

app.use(express.static("public"));

app.post("/upload", function (req, res) {
  upload(req, res, function (err) {
    if (err) {
      return res.end("Error uploading file.");
    }
    // res.set({'Content-Type': 'application/json; charset=utf-8'})
    return res.send({'age': 25});
  });
});

app.listen(2000, function () {
  console.log("Server is running on port 2000");
});
