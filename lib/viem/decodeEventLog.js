import {
  protocolRewardsABI,
  zoraCreator1155ImplABI,
} from "@zoralabs/protocol-deployments";
import { parseEventLogs } from "viem";
import getTransferSingleLog from "./getTransferSingleLog";
import getTransferLog from "./getTransferLog";

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
