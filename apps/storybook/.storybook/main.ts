import type { StorybookConfig } from "@storybook/react-vite"
import { resolve } from "path"

const config: StorybookConfig = {
  stories: ["../stories/**/*.mdx", "../stories/**/*.stories.@(ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-styling",
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
      define: { "process.env": {} },
      resolve: {
        alias: [
          {
            find: "@radish-la/fresco",
            replacement: resolve(__dirname, "../../../packages/fresco/src/"),
          },
          {
            find: "@/components",
            replacement: resolve(__dirname, "../components/"),
          },
          {
            find: "@/config",
            replacement: resolve(__dirname, "../config/"),
          },
        ],
      },
    }
  },
}

export default config
