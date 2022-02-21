const hex2ascii = require("hex2ascii");

module.exports = (data) => JSON.parse(hex2ascii(data));
