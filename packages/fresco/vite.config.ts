import { defineConfig } from "vite"
import packageJson from "./package.json"

export default defineConfig({
  ssr: {
    noExternal: true,
  },
  build: {
    target: "esnext",
    lib: {
      name: packageJson.name,
      formats: ["es"],
      entry: ["./src/index.tsx", "./src/atoms/index.tsx"],
    },
    reportCompressedSize: true,
    minify: "esbuild",
    chunkSizeWarningLimit: 5,
    rollupOptions: {
      treeshake: true,
      cache: true,
      external: [
        "react/jsx-runtime",
        ...Object.keys(packageJson.peerDependencies),
      ],
      output: {
        esModule: true,
        globals: {
          react: "React",
        },
        banner: `"use client";`,
        preserveModules: true,
        preserveModulesRoot: "./src",
        sourcemapExcludeSources: true,
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
    ignoreAnnotations: true,
  },
})
