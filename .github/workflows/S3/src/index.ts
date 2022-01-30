import * as core from "@actions/core";
import { spawnSync, execSync } from "child_process";

(async function () {
  try {
    const frontDir = core.getInput("FrontDir");
    console.log("frontDirFrontDir  ", frontDir);
    execSync(`npm --prefix ./${frontDir} install`);
    execSync(`npm --prefix ./${frontDir} run build`);
    core.info("Site Builded");
    const buildDir = core.getInput("BuildDir");
    const S3BucketName = core.getInput("S3BucketName");
    const useDelete = core.getInput("useDelete");
    const deleteString = useDelete ? "--delete" : "";
    spawnSync(`aws s3 sync ./${buildDir} s3://${S3BucketName} ${deleteString}`);
    core.info("Build Folder Uploaded to S3 Bucket");
  } catch (error) {
    core.setFailed(error as string);
  }
})();
