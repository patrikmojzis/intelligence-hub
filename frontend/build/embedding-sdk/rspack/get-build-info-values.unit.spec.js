const { execFileSync } = require("child_process");
const os = require("os");
const path = require("path");

describe("getBuildInfoValues", () => {
  it("uses injected Git metadata outside a Git checkout", () => {
    const modulePath = path.join(__dirname, "get-build-info-values.js");
    const script = `
      const { getBuildInfoValues } = require(${JSON.stringify(modulePath)});
      process.stdout.write(JSON.stringify(getBuildInfoValues({ version: "v1-test" })));
    `;

    const output = execFileSync(process.execPath, ["-e", script], {
      cwd: os.tmpdir(),
      env: {
        ...process.env,
        GIT_BRANCH: "master",
        GIT_COMMIT_SHA: "abcdef1234567890",
      },
    });

    expect(JSON.parse(output.toString())).toMatchObject({
      VERSION: "v1-test",
      GIT_BRANCH: "master",
      GIT_COMMIT_SHA: "abcdef1",
    });
  });
});
