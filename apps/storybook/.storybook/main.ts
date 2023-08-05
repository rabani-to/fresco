import type { StorybookConfig } from "@storybook/react-vite"
import { resolve } from "path"

const config: StorybookConfig = {
  stories: ["../stories/**/*.mdx", "../stories/**/*.stories.@(ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: "@storybook/react-vite",
  typescript: {
    reactDocgen: "react-docgen",
  },
  async viteFinal(config) {
    return {
      ...config,
      resolve: {
        alias: [
          {
            find: "@radish-la/fresco",
            replacement: resolve(__dirname, "../../../packages/fresco/src/"),
          },
        ],
      },
    }
  },
}

export default config
