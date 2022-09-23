const fs = require("fs");
const { resolve } = require("path");
const compareKeywords = require("../utils/compareKeywords.js");
const scanPdf = require("../utils/scanPdf.js");

exports.view = async (req, res) => {
  res.send("Welcome to server");
};

exports.scan = (req, res) => {
  const { keywords } = req.body;

  const files = req.files;

  const filePromises = Object.keys(files).map((key) => {
    const uploadPath = `./uploads/${files[key].name}`;

    return new Promise((resolve, reject) => {
      // scan current file
      files[key].mv(uploadPath, async function (err) {
        if (err) return res.status(500).send(err);

        const textData = await scanPdf(uploadPath);

        const percentage = compareKeywords(
          textData.keywords,
          JSON.parse(keywords)
        );

        fs.unlinkSync(uploadPath);

        resolve({
          author: textData.fileInfo.Author,
          email: textData.email,
          percentage: percentage,
        });
      });
    });
  });

  Promise.all(filePromises).then((data) => res.send(data));
};
