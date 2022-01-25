import { Request, Response, NextFunction } from "express";
import AWS from "aws-sdk";
const ddb = new AWS.DynamoDB.DocumentClient({ region: "eu-west-1" });
export default async function getByWord(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { word } = req.params;
  console.log("i am in get by word");
  console.log(word);
  const params = {
    TableName: "DictionaryEnglish", // change this !!!
    KeyConditionExpression: "word = :word",
    ExpressionAttributeValues: {
      ":word": word.toUpperCase(),
    },
  };
  try {
    const result = await ddb.query(params).promise();
    console.log(result);
    if (!result.Count) {
      return next({ status: "400", msg: "Item did not found" });
    }
    res.send(result.Items);
  } catch (err) {
    console.log("in GBW error", err);
    return next();
  }
}
