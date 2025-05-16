const fs = require("fs");
const process = require("process");
const axios = require("axios");

function cat(path) {
  fs.readFile(path, "utf8", function (err, data) {
    if (err) {
      console.log(`Error reading ${path}: ${err}`);
      process.exit(1);
    }

    console.log(data);
  });
}

async function webCat(path) {
  try {
    const res = await axios.get(path);
    console.log(res.data);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

let argument = process.argv[2];

if (argument.slice(0, 4) === "http") {
  webCat(argument);
} else {
  cat(argument);
}
