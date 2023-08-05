import type { Meta, StoryObj } from "@storybook/react"
import { ERC20 } from "@radish-la/fresco/atoms"
import { chainSelector } from "@/config/controls"

type ComponentType = typeof ERC20.BalanceOf
export default {
  component: ERC20.BalanceOf,
  args: {
    token: "",
  },
  argTypes: {
    chainId: chainSelector,
  },
} as Meta<ComponentType>

type Story = StoryObj<ComponentType>

export const BalanceOf: Story = {
  name: "ERC20 BalanceOf",
  args: {
    account: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
  },
  render: (args) => (
    <ERC20.BalanceOf {...args}>
      {({ isLoading, data, error, isError, isSuccess }) => (
        <div>
          <section className="flex flex-col border-b pb-4 mb-4">
            <b>Address: {args.account}</b>
            <b>isLoading: {String(isLoading)}</b>
            <b>Data: {data?.formatted || "0"} ETH</b>
            <b>error: {error?.message || "null"}</b>
            <b>isError: {String(isError)}</b>
            <b>isSuccess: {String(isSuccess)}</b>
          </section>

          <section className="flex flex-col">
            <b>enabled: {args.enabled}</b>
            <b>chainId: {args.chainId}</b>
            <b>token: {args.token}</b>
          </section>
        </div>
      )}
    </ERC20.BalanceOf>
  ),
}
