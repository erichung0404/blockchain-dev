function BlockchainError(message = "") {
    this.name = "BlockchainError";
    this.message = message;
}
BlockchainError.prototype = Error.prototype;

module.exports = {
  BlockchainError,
};
