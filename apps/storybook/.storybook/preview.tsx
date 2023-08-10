import type { Preview } from "@storybook/react"
import WagmiProvider from "./WagmiProvider"
import "../tailwind.css"

const preview: Preview = {
  decorators: [
    (Story) => (
      <WagmiProvider>
        <Story />
      </WagmiProvider>
    ),
  ],
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      values: [
        { name: "default", value: "#ffffff" },
        { name: "gelato", value: "#fffcf9" },
        { name: "vento", value: "#f5fffe" },
      ],
    },
  },
}

export default preview
