import { Request, Response, NextFunction } from "express";
import * as AWS from "aws-sdk";
const ddb = new AWS.DynamoDB.DocumentClient({ region: "eu-west-1" });
export default async function getByWordByPartOfSpeech(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { word, partOfSpeech } = req.params;
  const params = {
    TableName: "DictionaryEnglish",
    KeyConditionExpression: "pos = :pos AND word = :word",
    ExpressionAttributeValues: {
      ":pos": partOfSpeech,
      ":word": word.toUpperCase(),
    },
  };
  try {
    const response = await ddb
      .query(params, (err, data) => {
        if (err) return err;
        return data;
      })
      .promise();
    if (!response.Count) {
      return next({ status: "400", msg: "Item did not found" });
    }
    res.send(response.Items);
  } catch (err) {
    return next();
  }
}
