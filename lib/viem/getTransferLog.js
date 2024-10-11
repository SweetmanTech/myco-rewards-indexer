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
    return { collector: to, tokenId };
  } catch (error) {
    console.error("No TransferSingle logs found");
    return {};
  }
};

export default getTransferLog;
