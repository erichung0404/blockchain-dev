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
        throw new Error.BlockchainError(`_addBlock failed: ${e}`);
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
    it("should get correct block", async () => {
      const blockchain = new Blockchain();
      const fakeBlock = createBlock();
      blockchain._addBlock(fakeBlock);

      let targetBlock;
      try {
        targetBlock = await blockchain.getBlockByHash(fakeBlock.hash);
      } catch (e) {
        throw new Error.BlockchainError(`getBlockByHash failed: ${e}`);
      }
      expect(targetBlock).toEqual(fakeBlock);
    });

    it("should throw if multiple blocks are found", async () => {
      const blockchain = new Blockchain();
      const fakeBlocks = Array(2)
        .fill()
        .map((_) => createBlock());

      // assign same hash to blocks and add to blockchain
      const fakeHash = "fake hash";
      fakeBlocks.map((fakeBlock) => (fakeBlock.hash = fakeHash));
      fakeBlocks.forEach((fakeBlock) => blockchain._addBlock(fakeBlock));

      await expect(blockchain.getBlockByHash(fakeHash)).rejects.toBeInstanceOf(
        Error.BlockchainError
      );
    });

    it("should throw if no block is found", async () => {
      const blockchain = new Blockchain();
      const fakeHash = "hash not exists";
      await expect(blockchain.getBlockByHash(fakeHash)).rejects.toBeInstanceOf(
        Error.BlockchainError
      );
    });
  });

  describe("getStarsByWalletAddress", () => {
    it.todo("should sucess");
    it.todo("should fail");
  });

  describe("validateChain", () => {
    it("should be valid", async () => {
      const blockchain = new Blockchain();
      const fakeBlock = createBlock();
      fakeBlock.hash = null;
      blockchain._addBlock(fakeBlock);
      const errorLog = await blockchain.validateChain();
      expect(errorLog.length).toBe(0);
    });

    it("should be invalid", async () => {
      const blockchain = new Blockchain();

      // tamper the block hash
      const genesisBlock = await blockchain.getBlockByHeight(0);
      genesisBlock.hash = "invalid hash";

      const errorLog = await blockchain.validateChain();
      expect(errorLog.length).toBe(1);
    });
  });
});
