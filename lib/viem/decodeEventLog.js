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
    const collectionLogs = parseEventLogs({
      abi: zoraCreator1155ImplABI,
      eventName: "TransferSingle",
      logs: event.allTxLogs,
    });
    console.log("collectionLogs:", collectionLogs);

    const { to, id, value } = collectionLogs[0].args;
    parsedLog.args = {
      ...parsedLog.args,
      collector: to,
      tokenId: id,
      quantity: value,
    };
  } catch (parseError) {
    console.log("FAILED event:", event);
    console.error("Error parsing event log:", parseError);
    if (!parsedLog) parsedLog = { eventName: "Unknown", args: {} };
  }
  return parsedLog;
};

export default decodeEventLog;
