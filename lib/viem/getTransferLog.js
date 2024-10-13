import { parseEventLogs } from "viem";

const getTransferLog = (logs) => {
  const transferLogs = parseEventLogs({
    abi: [
      {
        name: "Transfer",
        type: "event",
        inputs: [
          { indexed: true, name: "from", type: "address" },
          { indexed: true, name: "to", type: "address" },
          { indexed: true, name: "tokenId", type: "uint256" },
        ],
      },
    ],
    eventName: "Transfer",
    logs,
  });
  try {
    const { tokenId, to } = transferLogs[0].args;
    console.log("transferLogs", transferLogs[0]);
    return {
      collector: to,
      tokenId,
      collectionAddress: transferLogs[0].address,
    };
  } catch (error) {
    console.error("No TransferSingle logs found");
    return {};
  }
};

export default getTransferLog;
