import * as iam from "aws-cdk-lib/aws-iam";
import { Lazy } from "aws-cdk-lib";
import * as ssm from "aws-cdk-lib/aws-ssm";
import { Construct } from "constructs";

export function getPolicy(scope: any, actions: string[], arnKey: string) {
  return new iam.PolicyStatement({
    actions: actions,
    resources: [
      Lazy.string({
        produce: () =>
          ssm.StringParameter.valueForStringParameter(scope, arnKey),
      }),
      Lazy.string({
        produce: () =>
          ssm.StringParameter.valueForStringParameter(scope, arnKey),
      }) + "/index/*",
    ],
  });
}
export function getEnv(scope: any, key: string) {
  return Lazy.string({
    produce: () => ssm.StringParameter.valueForStringParameter(scope, key),
  });
}
