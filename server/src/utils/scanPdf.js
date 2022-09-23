const fs = require("fs");
const path = require("path");
const pdf = require("pdf-parse");

const scanPdf = async (filePath) => {
  const absolutePath = path.resolve(__dirname, "../../", filePath);
  const dataBuffer = fs.readFileSync(absolutePath);

  const data = await pdf(dataBuffer);

  const email = data.text.match(
    /(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/g
  );

  console.log(email.toString());

  const keywords = data.text.toLowerCase().split(/[^A-Za-z0-9]/);

  const fileInfoSubset = (({ Author, Creator, CreationDate, ModDate }) => ({
    Author,
    Creator,
    CreationDate,
    ModDate,
  }))(data.info);

  const uniqueKeywords = [...new Set(keywords)];

  const results = {
    fileInfo: fileInfoSubset,
    keywords: uniqueKeywords,
    email: email.toString().toLowerCase(),
  };

  return results;
};

module.exports = scanPdf;
