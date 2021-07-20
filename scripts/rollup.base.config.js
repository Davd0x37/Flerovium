import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import esbuild from "rollup-plugin-esbuild";
import json_resolve from "@rollup/plugin-json";
import dts from "rollup-plugin-dts";

const defaultOptions = {
  plugins: {
    nodeResolve: {
      browser: true,
    },
  },
};

export default {
  index: (options = defaultOptions) => ({
    input: "src/index.ts",
    plugins: [
      nodeResolve({
        jsnext: true,
        preferBuiltins: true,
        browser: options.plugins.nodeResolve.browser,
      }),
      commonjs(),
      json_resolve(),
      esbuild({
        include: /\.[jt]sx?$/,
        exclude: /node_modules/,
        watch: process.argv.includes("--watch"),
        sourceMap: false,
        minify: process.env.NODE_ENV === "production",
        target: "esnext",
        define: {
          __VERSION__: '"x.y.z"',
        },
        tsconfig: "tsconfig.json",
        loaders: {
          ".json": "json",
        },
      }),
    ],
    external: [/node_modules/],
  }),
  definitions: {
    input: "src/index.ts",
    output: [{ file: "lib/index.d.ts", format: "es" }],
    plugins: [dts()],
  },
};
