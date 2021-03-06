import * as core from "@actions/core";
import { spawnSync, execSync } from "child_process";

(async function () {
  try {
    const frontDir = core.getInput("FrontDir");
    execSync(`npm --prefix ./${frontDir} install`);
    core.info("Dependencies Installed");
    execSync(`npm --prefix ./${frontDir} run build`);
    core.info("Site Builded");
    execSync(
      `curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"`
    );
    execSync(`unzip awscliv2.zip`);
    execSync(`sudo ./aws/install --update`);
    const buildDir = core.getInput("BuildDir");
    const S3BucketName = core.getInput("S3BucketName");
    const result = execSync(`aws s3 cp . s3://${S3BucketName} --recursive`, {
      cwd: `./${buildDir}`,
    });
    console.log(result);
    core.info("Build Folder Uploaded to S3 Bucket");
  } catch (error) {
    core.setFailed(error as string);
  }
})();
