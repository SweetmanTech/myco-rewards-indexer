// lib/rateLimiter.js
import Bottleneck from "bottleneck";

const limiter = new Bottleneck({
  reservoir: 100, // initial number of requests
  reservoirRefreshAmount: 100,
  reservoirRefreshInterval: 10 * 1000, // refresh every minute
  //   maxConcurrent: 5, // maximum concurrent requests
  //   minTime: 333, // wait time between requests
});

export default limiter;
