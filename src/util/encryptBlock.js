const { SHA256 } = require("crypto-js");

module.exports = (block) => SHA256(JSON.stringify(block)).toString();
