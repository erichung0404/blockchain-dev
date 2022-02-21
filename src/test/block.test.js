const Constant = require("../common/constant.js");
const { Block } = require("../block.js");
const { encodeData, encryptBlock } = require("../util");

const createData = ({ data }) => ({ data });
const createBlock = ({ data = createData({ data: Constant.kGenesisBlock }) } = {}) => {
  const block = new Block(data);
  block.hash = encryptBlock(block);
  return block;
};

describe("block", () => {
  describe("validate", () => {
    it("should be valid if block has not been tampered", async () => {
      const block = createBlock();
      const isValid = await block.validate();
      expect(isValid).toBeTruthy();
    });

    it("should be invalid if block is body tampered", async () => {
      const block = createBlock();

      // tamper the block data with new data
      const fakeData = {
        ...block.body,
        ...createData({ data: "vicious data" }),
      };
      block.body = encodeData(fakeData);

      const isValid = await block.validate();
      expect(isValid).toBeFalsy();
    });

    it("should be invalid if new attributes is added to the block", async () => {
      const block = createBlock();

      // tamper the block with new attribute
      block.newAttribute = "new attribute";

      const isValid = await block.validate();
      expect(isValid).toBeFalsy();
    });
  });

  describe("getBData", () => {
    it("should get decoded data if the block is not genesis block", () => {
      const fakeData = createData({ data: 'eric' });
      const block = createBlock({ data: fakeData });
      const decodedData = block.getBData();
      expect(decodedData).toEqual(fakeData.data);
    });

    it("should get empty string if the block is genesis block", () => {
      const block = createBlock();
      const decodedData = block.getBData();
      expect(decodedData).toBe("");
    });
  });
});
