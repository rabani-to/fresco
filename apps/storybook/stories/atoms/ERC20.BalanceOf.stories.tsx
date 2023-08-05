import type { Meta, StoryObj } from "@storybook/react"
import { ERC20 } from "@radish-la/fresco/atoms"

type ComponentType = typeof ERC20.BalanceOf
export default {
  component: ERC20.BalanceOf,
} as Meta<ComponentType>

type Story = StoryObj<ComponentType>

export const BalanceOf: Story = {
  name: "ERC20 BalanceOf",
  args: {
    account: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
  },
  render: (args) => (
    <ERC20.BalanceOf {...args}>
      {({ isLoading, data }) => (
        <section className="flex flex-col">
          <b>Address: {args.account}</b>
          <b>isLoading: {String(isLoading)}</b>
          <b>Data: {data?.formatted || "0"} ETH</b>
        </section>
      )}
    </ERC20.BalanceOf>
  ),
}
