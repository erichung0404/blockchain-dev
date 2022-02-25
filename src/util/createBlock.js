const Constant = require("../common/constant.js");
const createData = require("./createData.js");
const encryptBlock = require("./encryptBlock.js");
const { Block } = require("../block.js");

module.exports = ({
  data = createData({ data: Constant.kGenesisBlock }),
} = {}) => {
  const block = new Block(data);
  block.hash = encryptBlock(block);
  return block;
};
