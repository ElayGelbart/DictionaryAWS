import fs from "fs";
import AWS from "aws-sdk";
const ddb = new AWS.DynamoDB.DocumentClient({ region: "eu-west-1" });

const scanItems = async () => {
  let itemsArray: Word.Item[] = [];
  try {
    const result = await ddb.scan({ TableName: "DictionaryEnglish" }).promise();
    if (!result.Items) {
      throw result;
    }
    itemsArray = itemsArray.concat(result.Items as []);
    const scanRetry = async (lastKey: Word.Item) => {
      const resultRetry = await ddb
        .scan({ TableName: "DictionaryEnglish", ExclusiveStartKey: lastKey })
        .promise();
      if (!resultRetry.Items) {
        throw result;
      }
      itemsArray = itemsArray.concat(resultRetry.Items as []);
      if (resultRetry.LastEvaluatedKey) {
        await scanRetry(resultRetry.LastEvaluatedKey as Word.Item);
      }
    };
    await scanRetry(result.LastEvaluatedKey as Word.Item);
    fs.writeFileSync("myDictionary.json", JSON.stringify(itemsArray));
  } catch (err) {
    console.log("an error ocurred", err);
  }
};
scanItems();
