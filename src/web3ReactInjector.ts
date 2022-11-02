import { InjectedConnector } from "@web3-react/injected-connector";

//const CHAIN_ID_RINKEBY = 4;
// const CHAIN_ID_MAINNET = 1;
// const CHAIN_ID_LOCAL = 31337;

export const injected = new InjectedConnector({
  supportedChainIds: [5],
});
