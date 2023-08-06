import { resolve } from "path"
import { defineConfig } from "vite"
import packageJson from "./package.json"

export default defineConfig({
  build: {
    target: "esnext",
    lib: {
      formats: ["es", "umd"],
      name: packageJson.name,
      fileName: (format) => `index.${format}.js`,
      entry: resolve(__dirname, "./src/index.tsx"),
    },
    minify: "esbuild",
    chunkSizeWarningLimit: 5,
    rollupOptions: {
      treeshake: true,
      external: [...Object.keys(packageJson.peerDependencies)],
      output: {
        banner: `"use client";`,
        globals: {
          react: "React",
        },
        minifyInternalExports: true,
        compact: true,
      },
    },
  },
  esbuild: {
    legalComments: "none",
    minifySyntax: true,
    minifyIdentifiers: true,
    minifyWhitespace: true,
    treeShaking: true,
  },
})
