import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda_node from "aws-cdk-lib/aws-lambda-nodejs";
import * as iam from "aws-cdk-lib/aws-iam";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as gateway from "aws-cdk-lib/aws-apigateway";
import * as path from "path";
import { Lazy } from "aws-cdk-lib";
import * as ssm from "aws-cdk-lib/aws-ssm";

export class TaskStack extends cdk.Stack {
  api: gateway.RestApi;
  apiCustomAuthorizer: gateway.CfnAuthorizer;
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    this.newTaskLambdafunction();
  }
  newTaskLambdafunction() {
    const taskResource = this.api.root.addResource("new-task");
    const createTasksLambdaFn = new lambda_node.NodejsFunction(
      this,
      "GetSSMLambdafunction",
      {
        functionName: "GetSSMLambdafunction",
        runtime: lambda.Runtime.NODEJS_16_X,
        handler: "createTasks",
        entry: path.join(__dirname, "../controllers/taskController.ts"),
        initialPolicy: [
          new iam.PolicyStatement({
            actions: ["dynamodb:Scan"],
            resources: [
              "arn:aws:dynamodb:eu-west-1:257273543479:table/TasksTable",
              "arn:aws:dynamodb:eu-west-1:257273543479:table/TasksTable" +
                "/index/*",
            ],
          }),
        ],
      }
    );
  }
}
