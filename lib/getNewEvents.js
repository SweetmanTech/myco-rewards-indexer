import getBlockNumber from "./getBlockNumber.js";
import processBlocks from "./processBlocks.js";

async function getNewEvents(network, latestBlock) {
  try {
    const newLatestBlock = await getBlockNumber(network);
    if (newLatestBlock > latestBlock) {
      await processBlocks(network, latestBlock + 1n, newLatestBlock);
      return newLatestBlock;
    }
    return latestBlock;
  } catch (error) {
    console.error(`${network} - Error checking for new events:`, error);
    return latestBlock;
  }
}

export default getNewEvents;
