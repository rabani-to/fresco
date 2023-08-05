import { configureChains, createConfig, mainnet, WagmiConfig } from "wagmi"
import { publicProvider } from "wagmi/providers/public"

const { publicClient } = configureChains([mainnet], [publicProvider()])

const config = createConfig({
  autoConnect: true,
  publicClient,
})

export default function WagmiProvider({ children }: any) {
  return <WagmiConfig config={config}>{children}</WagmiConfig>
}
