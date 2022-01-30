import * as core from "@actions/core";
import { execSync } from "child_process";

(async function () {
  try {
    const frontDir = core.getInput("FrontDir");
    console.log("frontDirFrontDir  ", frontDir);
    execSync(`cd ./${frontDir} & npm install & npm build`);
    core.info("Site Builded");
    const buildDir = core.getInput("BuildDir");
    const S3BucketName = core.getInput("S3BucketName");
    const useDelete = core.getInput("useDelete");
    const deleteString = useDelete ? "--delete" : "";
    execSync(
      `cd ./${buildDir} & aws s3 sync . s3://${S3BucketName} ${deleteString}`
    );
    core.info("Build Folder Uploaded to S3 Bucket");
  } catch (error) {
    core.setFailed(error as string);
  }
})();
