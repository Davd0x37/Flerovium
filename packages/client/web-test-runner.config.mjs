import snowpackWebTestRunnerPlugin from "@snowpack/web-test-runner-plugin";
import { playwrightLauncher } from "@web/test-runner-playwright";

process.env.NODE_ENV = "test";

export default {
  files: ["(__tests__|src)/**/*.(test|spec).{ts,tsx}"],
  nodeResolve: true,
  concurrency: 10,
  browsers: [
    playwrightLauncher({ product: "chromium" }),
    playwrightLauncher({ product: "firefox" }),
    playwrightLauncher({ product: "webkit" }),
  ],
  plugins: [snowpackWebTestRunnerPlugin()],
};
