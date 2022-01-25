import { Request, Response, NextFunction } from "express";
import * as AWS from "aws-sdk";
const ddb = new AWS.DynamoDB.DocumentClient({ region: "eu-west-1" });
export default async function getByPartOfSpeech(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { part } = req.params;
  const params = {
    TableName: "DictionaryEnglish",
    IndexName: "pos-word-index",
    KeyConditionExpression: "pos = :pos",
    ExpressionAttributeValues: {
      ":pos": part,
    },
  };
  try {
    const response = await ddb
      .query(params, (err, data) => {
        if (err) return err;
        return data;
      })
      .promise();

    res.send(response);
  } catch (err) {
    return next();
  }
}
