import rpcRequest from "./rpcRequest.js";
import getEventSignature from "./viem/getEventSignature.js";

async function getTransactionDetails(network, transactionHash) {
  console.log(`${network} - Transaction hash:`, transactionHash);
  const txReceipt = await rpcRequest(network, "eth_getTransactionReceipt", [
    transactionHash,
  ]);
  console.log(`${network} - Transaction receipt:`, txReceipt);
  return txReceipt.logs;
}

async function getLogs(network, fromBlock, toBlock) {
  const CHUNK_SIZE = 1000n; // Adjust this value based on RPC limitations
  let allLogs = [];

  for (
    let chunkStart = fromBlock;
    chunkStart <= toBlock;
    chunkStart += CHUNK_SIZE
  ) {
    const chunkEnd =
      chunkStart + CHUNK_SIZE - 1n > toBlock
        ? toBlock
        : chunkStart + CHUNK_SIZE - 1n;
    console.log(
      `${network} - Fetching logs for blocks ${chunkStart} to ${chunkEnd}`
    );
    const logs = await rpcRequest(network, "eth_getLogs", [
      {
        topics: [getEventSignature()],
        fromBlock: `0x${chunkStart.toString(16)}`,
        toBlock: `0x${chunkEnd.toString(16)}`,
      },
    ]);

    const logPromises = logs.map((log) =>
      getTransactionDetails(network, log.transactionHash).then((allTxLogs) => ({
        matchedLog: log,
        allTxLogs: allTxLogs,
      }))
    );

    allLogs.push(...(await Promise.all(logPromises)));
  }

  return allLogs;
}

export default getLogs;
