import fetch from "node-fetch";
import { RPC_URLS } from "./rpc.js";

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function rpcRequest(network, method, params) {
  const urls = RPC_URLS[network];
  let lastError;
  for (let attempt = 0; attempt < 5; attempt++) {
    for (const url of urls) {
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params }),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.result;
      } catch (error) {
        console.log(
          `${network} - Attempt ${attempt + 1} failed for ${url}: ${
            error.message
          }`
        );
        lastError = error;
      }
    }
    await sleep(Math.pow(2, attempt) * 1000); // Exponential backoff
  }
  throw lastError;
}

export default rpcRequest;
