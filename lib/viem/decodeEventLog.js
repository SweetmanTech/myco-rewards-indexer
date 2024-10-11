import {
  protocolRewardsABI,
  zoraCreator1155ImplABI,
} from "@zoralabs/protocol-deployments";
import { parseEventLogs } from "viem";

const decodeEventLog = (event) => {
  let parsedLog;
  try {
    parsedLog = parseEventLogs({
      abi: protocolRewardsABI,
      logs: event.allTxLogs,
    })[0];
    const collectionLog = getTransferSingleLog(event.allTxLogs);
    const transferLog = getTransferLog(event.allTxLogs);
    console.log("transferLog:", transferLog);
    console.log("collectionLog:", collectionLog);
    parsedLog.args = {
      ...parsedLog.args,
      ...collectionLog,
      ...transferLog,
    };
  } catch (parseError) {
    console.log("FAILED event:", event);
    console.error("Error parsing event log:", parseError);
    if (!parsedLog) parsedLog = { eventName: "Unknown", args: {} };
  }
  return parsedLog;
};

export default decodeEventLog;

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
    console.log("transferLogs:", transferLogs);
    const { tokenId, to } = transferLogs[0].args;
    return { collector: to, tokenId };
  } catch (error) {
    console.log("No TransferSingle logs found");
    return {};
  }
};

const getTransferSingleLog = (logs) => {
  const collectionLogs = parseEventLogs({
    abi: zoraCreator1155ImplABI,
    eventName: "TransferSingle",
    logs,
  });
  console.log("collectionLogs:", collectionLogs);
  try {
    const { to, id, value } = collectionLogs[0].args;
    return { collector: to, tokenId: id, quantity: value };
  } catch (error) {
    console.log("No TransferSingle logs found");
    return {};
  }
};
