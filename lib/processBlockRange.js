import processBlocks from "./processBlocks.js";

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function processBlockRange(
  network,
  fromBlock,
  latestBlock,
  chunkSize = 10000n,
  delayMs = 1000 // Add a delay parameter
) {
  let currentBlock = fromBlock;
  while (currentBlock <= latestBlock) {
    const toBlock =
      currentBlock + chunkSize > latestBlock
        ? latestBlock
        : currentBlock + chunkSize;
    await processBlocks(network, currentBlock, toBlock);
    currentBlock = toBlock + 1n;

    // Add a delay between processing chunks
    await sleep(delayMs);
  }
}

export default processBlockRange;
