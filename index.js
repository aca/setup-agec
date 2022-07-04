"use strict";

const { promisify } = require("util");
const path = require("path");
const os = require("os");
const fs = require("fs");

const cache = require("@actions/tool-cache");
const core = require("@actions/core");

const chmod = promisify(fs.chmod);

if (require.main === module) {
  main().catch((err) => {
    console.error(err.stack);
    process.exit(1);
  });
}

async function main() {
  try {
    const version = core.getInput("version");
    const platform = os.platform();
    let arch = os.arch();
    if (arch === "x64") {
      arch = "amd64";
    }

    let toolPath = cache.find("agec", version, arch);
    let downloadUrl = `https://github.com/aca/agec/releases/download/v${version}/agec_${version}_${platform}_${arch}`

    if (!toolPath) {
      const downloadPath = await cache.downloadTool(downloadUrl);
      toolPath = await cache.cacheFile(downloadPath, "agec", "agec", version);
    }

    await chmod(path.join(toolPath, "agec"), 0o755);
    core.addPath(toolPath);
  } catch (error) {
    core.setFailed(error.message);
  }
}
