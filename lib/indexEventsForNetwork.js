import getBlockNumber from "./getBlockNumber.js";
import getFromBlock from "./getFromBlock.js";
import getNewEvents from "./getNewEvents.js";
import processBlockRange from "./processBlockRange.js";

async function indexEventsForNetwork(network) {
  console.log(`Starting indexer for ${network}...`);
  while (true) {
    try {
      const latestBlock = await getBlockNumber(network);
      let fromBlock = BigInt(getFromBlock(network));
      console.log(
        `${network} - Backfilling data from block ${fromBlock} to ${latestBlock}`
      );
      await processBlockRange(network, fromBlock, latestBlock);
      console.log(
        `${network} - Backfilling complete. Setting up watcher for new events...`
      );
      let currentBlock = latestBlock;
      setInterval(async () => {
        currentBlock = await getNewEvents(network, currentBlock);
      }, 15000);
      console.log(`${network} - Watcher set up. Waiting for new events...`);
      break; // Exit the loop if successful
    } catch (error) {
      console.error(`${network} - Error in indexEvents:`, error);
      console.log(`${network} - Retrying in 1 minute...`);
      await new Promise((resolve) => setTimeout(resolve, 60000));
    }
  }
}

export default indexEventsForNetwork;
