import type { Meta, StoryObj } from "@storybook/react"
import { ERC20 } from "@radish-la/fresco/atoms"
import PropTable from "@/components/PropTable"

import { chainSelector } from "@/config/controls"
import { mainnet } from "wagmi"

const component = ERC20.BalanceOf
type ComponentType = typeof component
export default {
  component,
  args: {
    token: "" as any,
    chainId: mainnet.id,
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
      {(renderProps) => (
        <PropTable<(typeof renderProps)["data"]>
          formatData={({ value = 0, ...extra }) => ({
            ...extra,
            value: `BigNumber ${value.toString()}`,
          })}
          config={args}
          props={renderProps}
        />
      )}
    </ERC20.BalanceOf>
  ),
}
