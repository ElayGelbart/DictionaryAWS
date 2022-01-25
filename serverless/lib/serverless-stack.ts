import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { Role } from "aws-cdk-lib/aws-iam";
import { Certificate } from "aws-cdk-lib/aws-certificatemanager";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { LambdaRestApi } from "aws-cdk-lib/aws-apigateway";
export class ServerlessStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    const apiHandler = new NodejsFunction(this, "api", {
      functionName: "getAPI",
      entry: `./back/index.ts`,
      handler: "proxy",
      role: Role.fromRoleArn(
        this,
        "LambdaRole",
        "arn:aws:iam::482065063915:role/LambdaDDB"
      ),
    });
    const cert = Certificate.fromCertificateArn(
      this,
      "myCert",
      "arn:aws:acm:eu-west-1:482065063915:certificate/1b5766fe-75a2-458d-adb3-148d61c5ca7e"
    );
    const restAPI = new LambdaRestApi(this, "APISTAGE", {
      handler: apiHandler,
      restApiName: "ApiGatewayLambda",
      deployOptions: { stageName: "dev" },
      description: "Express Server In Lambda",
      domainName: {
        domainName: "api.dictionary.elaygelbart.com",
        certificate: cert,
      },
      cloudWatchRole: true,
    });
  }
}
