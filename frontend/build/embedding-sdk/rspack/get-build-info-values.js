const { execFileSync } = require("child_process");

const readGitValue = (...args) => execFileSync("git", args).toString().trim();

module.exports.getBuildInfoValues = ({ version }) => ({
  ...(version && { VERSION: version }),
  GIT_BRANCH:
    process.env.GIT_BRANCH || readGitValue("rev-parse", "--abbrev-ref", "HEAD"),
  GIT_COMMIT_SHA: (
    process.env.GIT_COMMIT_SHA || readGitValue("rev-parse", "HEAD")
  ).slice(0, 7),
  BUILD_TIME: new Date().toISOString(),
});
