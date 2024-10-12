import Bottleneck from "bottleneck";

const limiter = new Bottleneck({
  reservoir: 100,
  reservoirRefreshAmount: 100,
  reservoirRefreshInterval: 10 * 1000,
});

export default limiter;
