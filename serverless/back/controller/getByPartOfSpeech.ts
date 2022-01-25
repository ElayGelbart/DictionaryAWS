import { Request, Response, NextFunction } from "express";
import AWS from "aws-sdk";
const ddb = new AWS.DynamoDB.DocumentClient({ region: "eu-west-1" });
export default async function getByPartOfSpeech(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { part } = req.params;
  console.log(part, "part");
  const params = {
    TableName: "DictionaryEnglish",
    IndexName: "pos-word-index",
    KeyConditionExpression: "pos = :pos",
    ExpressionAttributeValues: {
      ":pos": part,
    },
  };
  console.log("in pos");
  try {
    const response = await ddb
      .query(params, (err, data) => {
        if (err) return err;
        return data;
      })
      .promise();

    res.send(response);
  } catch (err) {
    console.log("err", err);
  }
}
