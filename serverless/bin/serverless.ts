#!/usr/bin/env node
import "source-map-support/register";
import { App } from "aws-cdk-lib";
import { ServerlessStack } from "../lib/serverless-stack";

const app = new App();
new ServerlessStack(app, "ServerlessStack", {
  stackName: "ApiLambdaStack",
});
