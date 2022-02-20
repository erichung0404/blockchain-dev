const { Block } = require("../block.js");

const createData = ({ data }) => ({ data });
const createBlock = ({ data = createData("Genesis Block") } = {}) =>
  new Block(data);

describe("block", () => {
  describe("validate", () => {
    // FIXME: test after implementation
    it.skip("should be valid if block has not been tampered", async () => {
      const block = createBlock();
      const isValid = await block.validate();
      expect(isValid).toBeTruthy();
    });

    // FIXME: test after implementation
    it.skip("should be invalid if block is tampered", async () => {
      const block = createBlock();
      const fakeData = createData({ data: "vicious data" });
      block.data = Buffer.from(JSON.stringify(fakeData)).toString("hex");
      const isValid = await block.validate();
      expect(isValid).toBeFalsy();
    });
  });

  describe("getBData", () => {
    it.todo("should get encoded data");
  });
});
