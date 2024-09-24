import processBlocks from "./processBlocks.js";

async function processBlockRange(
  network,
  fromBlock,
  latestBlock,
  chunkSize = 10000n
) {
  let currentBlock = fromBlock;
  while (currentBlock <= latestBlock) {
    const toBlock =
      currentBlock + chunkSize > latestBlock
        ? latestBlock
        : currentBlock + chunkSize;
    await processBlocks(network, currentBlock, toBlock);
    currentBlock = toBlock + 1n;
  }
}

export default processBlockRange;
