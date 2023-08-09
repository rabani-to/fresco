import type { Meta, StoryObj } from "@storybook/react"
import { ERC20 } from "@radish-la/fresco/atoms"
import PropTable from "@/components/PropTable"

const component = ERC20.AllowanceOf
type ComponentType = typeof component
export default {
  component,
  args: {
    token: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    spender: "0xeA51d7853EEFb32b6ee06b1C12E6dcCA88Be0fFE",
  },
} as Meta<ComponentType>

type Story = StoryObj<ComponentType>

export const AllowanceOf: Story = {
  name: "ERC20 AllowanceOf",
  args: {
    account: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
  },
  render: (args) => (
    <ERC20.AllowanceOf {...args} chainId={1}>
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
    </ERC20.AllowanceOf>
  ),
}
