import * as cdk from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import * as Serverless from "../lib/serverless-stack";

describe("CDK Template Test", () => {
  const app = new cdk.App();
  const stack = new Serverless.ServerlessStack(app, "MyTestStack");
  const template = Template.fromStack(stack);

  test("Lambda Created", () => {
    template.hasResourceProperties("AWS::Lambda::Function", {
      FunctionName: "getAPI",
      Runtime: "nodejs14.x",
    });
  });

  test("API-Gateway Created", () => {
    template.hasResourceProperties("AWS::ApiGateway::RestApi", {
      Name: "ApiGatewayLambda",
    });
  });

  test("API-Gateway has ANY Method", () => {
    template.hasResourceProperties("AWS::ApiGateway::Method", {
      HttpMethod: "ANY",
    });
  });

  test("API-Gateway Stage should be dev", () => {
    template.hasResourceProperties("AWS::ApiGateway::Stage", {
      StageName: "dev",
    });
  });
  test("API-Gateway Domain Name is api.dictionary.elaygelbart.com", () => {
    template.hasResourceProperties("AWS::ApiGateway::DomainName", {
      DomainName: "api.dictionary.elaygelbart.com",
    });
  });
});
