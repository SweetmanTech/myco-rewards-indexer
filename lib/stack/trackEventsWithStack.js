import fetch from "node-fetch";
import dotenv from "dotenv";
import getEventPayload from "./getEventPayload.js";

dotenv.config();

export const STACK_API_KEY = process.env.STACK_API_KEY;
export const STACK_API_URL = "https://track.stack.so/event";

async function trackEventsWithStack(network, events) {
  try {
    const payloads = events.map((event) => getEventPayload(network, event));

    const response = await fetch(STACK_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": STACK_API_KEY,
      },
      body: JSON.stringify(payloads),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log(`${events.length} events tracked with Stack.so successfully`);
  } catch (error) {
    console.error("Error tracking events with Stack.so:", error);
  }
}

export default trackEventsWithStack;
