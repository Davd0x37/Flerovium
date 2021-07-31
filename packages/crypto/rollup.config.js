import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import esbuild from "rollup-plugin-esbuild";

// @FIXME: web test runner and rollup plugin - can't bundle properly when module is imported
const defaults = {
  plugins: [
    nodeResolve({
      jsnext: true,
      preferBuiltins: false,
      browser: true,
    }),
    commonjs(),
    esbuild({
      include: /\.[jt]sx?$/,
      exclude: /node_modules/,
      watch: false,
      sourceMap: false,
      minify: false,
      target: "esnext",
      define: {
        __VERSION__: '"x.y.z"',
      },
      tsconfig: "./tsconfig.json"
    }),
  ]
}

export default [{
  input: "tests/crypto.spec.ts",
  output: {
    file: 'tests/crypto.test.js',
    name: 'crypto',
    format: 'es'
  },
  ...defaults
},{
  input: "tests/hash.spec.ts",
  output: {
    file: 'tests/hash.test.js',
    name: 'hash',
    format: 'es'
  },
  ...defaults
}]
;
