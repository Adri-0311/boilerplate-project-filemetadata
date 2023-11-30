var express = require("express");
const fileUpload = require("express-fileupload");
var cors = require("cors");
require("dotenv").config();

var app = express();

app.use(fileUpload());

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/fileanalyse", (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  const { upfile } = req.files;
  res
    .status(200)
    .json({ name: upfile.name, type: upfile.mimetype, size: upfile.size });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log(`Your app is listening on port: http://localhost:${port} `);
});
