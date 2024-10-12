import getBlockNumber from "./getBlockNumber.js";
import getFromBlock from "./getFromBlock.js";
import processBlockRange from "./processBlockRange.js";
import { subscribeToEvents } from "./websocketClient.js";
import getEventSignature from "./viem/getEventSignature.js";

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

      const eventSignature = getEventSignature();
      if (!eventSignature) {
        throw new Error("Event signature not defined.");
      }

      const eventName = "RewardsDeposit";
      await subscribeToEvents(network, eventName, async (logs) => {
        try {
          for (const log of logs) {
            await processBlockRange(
              network,
              BigInt(log.blockNumber),
              BigInt(log.blockNumber)
            );
            console.log(
              `${network} - Processed new event in block ${log.blockNumber}`
            );
          }
        } catch (error) {
          console.error(
            `${network} - Error processing real-time event:`,
            error
          );
        }
      });

      console.log(`${network} - Watcher set up. Listening for new events...`);
      break;
    } catch (error) {
      console.error(`${network} - Error in indexEvents:`, error);
      console.log(`${network} - Retrying in 1 minute...`);
      await new Promise((resolve) => setTimeout(resolve, 60000));
    }
  }
}

export default indexEventsForNetwork;
