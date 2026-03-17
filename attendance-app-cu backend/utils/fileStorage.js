const fs = require("fs");

const readData = (file) => {
  try {
    const data = fs.readFileSync(`./storage/${file}`);
    return JSON.parse(data);
  } catch {
    return [];
  }
};

const writeData = (file, data) => {
  fs.writeFileSync(`./storage/${file}`, JSON.stringify(data, null, 2));
};

module.exports = { readData, writeData };
