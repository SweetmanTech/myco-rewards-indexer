import convertBigIntToString from "../convertBigIntToString.js";
import decodeEventLog from "../viem/decodeEventLog.js";

const getEventPayload = (network, event) => {
  let decodedLog = decodeEventLog(event);
  const {
    creator,
    createReferral,
    mintReferral,
    firstMinter,
    zora,
    from,
    creatorReward,
    createReferralReward,
    mintReferralReward,
    firstMinterReward,
    zoraReward,
  } = decodedLog.args;
  const convertedEvent = convertBigIntToString({
    ...event,
    decodedLog,
  });
  console.log("convertedEvent", convertedEvent);

  const payload = {
    name: `${convertedEvent.decodedLog.eventName}-${network}` || "UnknownEvent",
    account: creator,
    uniqueId: `${network}-${event.transactionHash}-${convertedEvent.logIndex}`,
    pointSystemId: process.env.STACK_SYSTEM_ID,
    points: 1,
    metadata: {
      ...convertedEvent.decodedLog.args,
      ...convertBigIntToString({
        creator,
        createReferral,
        mintReferral,
        firstMinter,
        zora,
        from,
        creatorReward,
        createReferralReward,
        mintReferralReward,
        firstMinterReward,
        zoraReward,
      }),
      blockNumber: convertedEvent.blockNumber,
      network,
      protocolRewardsContract: event.address,
      transactionHash: event.transactionHash,
    },
  };
  return payload;
};

export default getEventPayload;
