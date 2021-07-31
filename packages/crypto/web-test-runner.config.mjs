import { playwrightLauncher } from "@web/test-runner-playwright";
import { esbuildPlugin } from "@web/dev-server-esbuild";

process.env.NODE_ENV = "test";

export default {
  files: ["tests/**/*.(test|spec).{js,jsx,mjs}"],
  nodeResolve: true,
  concurrency: 10,
  browsers: [
    playwrightLauncher({ product: "chromium" }),
    playwrightLauncher({ product: "firefox" }),
    playwrightLauncher({ product: "webkit" }),
  ],
  plugins: [esbuildPlugin({ ts: true, target: "auto" })],
};
