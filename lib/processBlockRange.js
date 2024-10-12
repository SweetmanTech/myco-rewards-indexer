import processBlocks from "./processBlocks.js";

const CHUNK_SIZE = 1000;

async function processBlockRange(network, fromBlock, latestBlock) {
  let currentBlock = fromBlock;
  while (currentBlock <= latestBlock) {
    const toBlock =
      currentBlock + BigInt(CHUNK_SIZE) > latestBlock
        ? latestBlock
        : currentBlock + BigInt(CHUNK_SIZE);

    await processBlocks(network, currentBlock, toBlock);
    currentBlock = toBlock + 1n;

    // Optional: Add a short delay between requests
    await new Promise((resolve) => setTimeout(resolve, 200));
  }
}

export default processBlockRange;
