import { Request, Response, NextFunction } from "express";
import AWS from "aws-sdk";
const ddb = new AWS.DynamoDB.DocumentClient({ region: "eu-west-1" });
export default async function getByWord(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { word } = req.params;
  const params = {
    TableName: "DictionaryEnglish",
    KeyConditionExpression: "word = :word",
    ExpressionAttributeValues: {
      ":word": word.toUpperCase(),
    },
  };
  try {
    const result = await ddb.query(params).promise();
    console.log("result", result);
    if (!result.Count) {
      return next({ status: "400", msg: "Item did not found" });
    }
    res.send(result.Items);
  } catch (err) {
    console.log("error get by word", err);
    return next();
  }
}
