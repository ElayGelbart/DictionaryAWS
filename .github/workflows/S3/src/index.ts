import * as core from "@actions/core";
import { execSync } from "child_process";

(async function () {
  try {
    const frontDir = core.getInput("FrontDir");
    execSync(`cd ./${frontDir}`);
    core.info(`change Dir to ${frontDir}`);
    execSync("npm install");
    core.info(`install dependencies ${frontDir}`);
    core.info("dependencies installed");
    execSync("npm build");
    core.info("Site Builded");
    const buildDir = core.getInput("BuildDir");
    execSync(`cd ./${buildDir}`);
    const S3BucketName = core.getInput("S3BucketName");
    const useDelete = core.getInput("useDelete");
    const deleteString = useDelete ? "--delete" : "";
    execSync(`aws s3 sync . s3://${S3BucketName} ${deleteString}`);
    core.info("Build Folder Uploaded to S3 Bucket");
  } catch (error) {
    core.setFailed(error as string);
  }
})();
