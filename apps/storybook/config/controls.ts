import { arbitrum, optimism, polygon, mainnet, goerli } from "@wagmi/chains"

export const chainSelector = {
  control: {
    type: "select",
    labels: {
      [mainnet.id]: "mainnet",
      [arbitrum.id]: "arbitrum",
      [polygon.id]: "polygon",
      [optimism.id]: "optimism",
      [goerli.id]: "goerli-testnet",
    },
  },
  options: [mainnet.id, arbitrum.id, polygon.id, optimism.id, goerli.id],
}
