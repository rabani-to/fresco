import { arbitrum, optimism, polygon, mainnet } from "@wagmi/chains"

export const chainSelector = {
  control: {
    type: "select",
    labels: {
      [mainnet.id]: "mainnet",
      [arbitrum.id]: "arbitrum",
      [polygon.id]: "polygon",
      [optimism.id]: "optimism",
    },
  },
  options: [mainnet.id, arbitrum.id, polygon.id, optimism.id],
}
