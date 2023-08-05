import { configureChains, createConfig, WagmiConfig } from "wagmi"
import { publicProvider } from "wagmi/providers/public"
import { arbitrum, optimism, polygon, mainnet } from "@wagmi/chains"

const { publicClient } = configureChains(
  [arbitrum, optimism, polygon, mainnet],
  [publicProvider()]
)

const config = createConfig({
  autoConnect: true,
  publicClient,
})

export default function WagmiProvider({ children }: any) {
  return <WagmiConfig config={config}>{children}</WagmiConfig>
}
