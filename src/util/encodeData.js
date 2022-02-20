module.exports = (data) => Buffer.from(JSON.stringify(data)).toString("hex");
