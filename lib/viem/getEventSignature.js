import { zoraCreator1155ImplABI } from "@zoralabs/protocol-deployments";
import { encodeEventTopics, getAbiItem } from "viem";

const getEventSignature = () => {
  const eventName = "UpdatedPermissions";
  const updatedPermissionsEvent = getAbiItem({
    abi: zoraCreator1155ImplABI,
    name: eventName,
  });
  return updatedPermissionsEvent
    ? encodeEventTopics({
        abi: [updatedPermissionsEvent],
        eventName,
      })[0]
    : undefined;
};

export default getEventSignature;
