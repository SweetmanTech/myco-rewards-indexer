export const NETWORKS = {
  BASE_MAINNET: "base",
  BASE_TESTNET: "baseSepolia",
  ZORA_MAINNET: "zora",
  ZORA_TESTNET: "zoraSepolia",
};

export const RPC_URLS = {
  [NETWORKS.BASE_MAINNET]: [
    "https://mainnet.base.org",
    "https://base.llamarpc.com",
    "https://base.blockpi.network/v1/rpc/public",
  ],
  [NETWORKS.BASE_TESTNET]: [
    "https://sepolia.base.org",
    "https://base-sepolia-rpc.publicnode.com",
    "https://base-sepolia.blockpi.network/v1/rpc/public",
  ],
  [NETWORKS.ZORA_MAINNET]: ["https://zora.drpc.org", "https://rpc.zora.energy"],
  [NETWORKS.ZORA_TESTNET]: ["https://sepolia.rpc.zora.energy"],
};
