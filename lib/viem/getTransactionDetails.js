import rpcRequest from "../rpcRequest";

async function getTransactionDetails(network, transactionHash) {
  const txReceipt = await rpcRequest(network, "eth_getTransactionReceipt", [
    transactionHash,
  ]);
  return txReceipt.logs;
}

export default getTransactionDetails;
