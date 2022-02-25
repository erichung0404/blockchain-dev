const Error = require("../exception/error.js");
const { createBlock } = require("../util");
const { Blockchain } = require("../blockchain.js");

describe("blockchain", () => {
  describe("_addBlock", () => {
    it("should add block sucessfully", async () => {
      const blockchain = new Blockchain();
      const fakeBlock = createBlock();
      let addedBlock;
      try {
        addedBlock = await blockchain._addBlock(fakeBlock);
      } catch (e) {
        throw new Error(`_addBlock failed: ${e}`);
      }
      expect(fakeBlock.previousBlockHash).toBe(
        blockchain.chain[blockchain.height - 1].hash
      );
      expect(blockchain.height).toBe(1);
      expect(addedBlock).toEqual(fakeBlock);
      expect(blockchain.chain[blockchain.height]).toEqual(fakeBlock);
    });

    it("should throw exception if fail to add block", async () => {
      const blockchain = new Blockchain();

      // deliberately change the blockchain height to fail the method
      blockchain.height = Number.MAX_SAFE_INTEGER;

      const fakeBlock = createBlock();
      const func = () => blockchain._addBlock(fakeBlock);

      await expect(func).rejects.toBeInstanceOf(Error.BlockchainError);
    });
  });

  describe("requestMessageOwnershipVerification", () => {
    it.todo("should sucess");
    it.todo("should fail");
  });

  describe("submitStar", () => {
    it.todo("should sucess");
    it.todo("should fail");
  });

  describe("getBlockByHash", () => {
    it.todo("should sucess");
    it.todo("should fail");
  });

  describe("getStarsByWalletAddress", () => {
    it.todo("should sucess");
    it.todo("should fail");
  });

  describe("validateChain", () => {
    it.todo("should sucess");
    it.todo("should fail");
  });
});
